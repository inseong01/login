import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import dotenv from "dotenv";
import { createClient } from "redis";
import cookieParser from 'cookie-parser';
import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref, remove, set } from "firebase/database";
dotenv.config();

const redisInit = {
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },
}
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.FIREBASE_DATABASEURL,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENTID,
};

// Express
const app = express();
const port = 3003;

// Redis
const client = createClient(redisInit);
client.on('error', err => console.log('Redis Client Error', err));
await client.connect();

// Firebase
const firebaseInit = initializeApp(firebaseConfig);
const db = getDatabase(firebaseInit);

// middlewaree
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', async (req, res) => {
  console.log('this is /');
  res.send('Hello');
})

// 로그인
app.post('/login', async (req, res) => {
  // 정보 받음
  const { id, password } = req.body
  // DB에서 정보 확인
  let error = {
    server: false,
    result: false,
  };
  const userInfo = await get(child(ref(db), `users/${id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        error.result = true;
        return;
      }
    })
    .catch((e) => {
      console.error('Login server error', e);
      error.server = true;
      return;
    })
  // 로그인 실패 결과 전달
  if (error.server) return res.send('SERVER ERROR');
  if (error.result) return res.send('ID ERROR');
  if (userInfo.password !== password) return res.send('PASSWORD ERROR');
  // 세션ID 발급  
  const sessionID = uuidv4();
  // Redis, 세션ID 추가 (사용자ID: 세션ID)
  await client.set(id, sessionID);
  // 로그인 성공 결과 전달('OK' 반환)
  res.cookie('login',
    JSON.stringify({ 'id': id, 'sessionID': sessionID, 'name': encodeURIComponent(userInfo.name) }),
    { httpOnly: true, secure: true, path: '/', maxAge: 300000 } // 100ms = 1s
  ).sendStatus(200);
})

// 로그아웃
app.post('/logout', async (req, res) => {
  // 정보 받음
  const loginCookie = JSON.parse(req.cookies?.login);
  const id = loginCookie.id
  // 로그아웃 실패 결과 전달
  if (!id) res.send('FAIL');
  // 세션ID 삭제
  await client.del(id);
  // 로그아웃 성공 결과 전달
  res.clearCookie('login').send('OK');
})

// 회원가입
app.post('/signUp', async (req, res) => {
  const { id, password, name } = req.body;
  // DB, 정보 삽입
  set(ref(db, 'users/' + id), {
    id, password, name
  })
  // DB, 삽입된 정보 확인
  const isSignUpInfoInsert = await get(child(ref(db), `users/${id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return true;
      } else {
        return false;
      }
    })
    .catch((e) => {
      console.error('SignUp server error', e);
      return false;
    })
  // 응답 반환(로그인 반환 값과 일치시킴)
  const isOk = isSignUpInfoInsert ? 'OK' : 'ERROR';
  res.send(isOk)
})
// DB, ID 중복확인
app.post('/checkID', async (req, res) => {
  const { id } = req.body?.signUp;
  // 로그인 검증 호출 동일
  const isDuplicatedID = await get(child(ref(db), `users/${id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return false;
      } else {
        return true;
      }
    })
    .catch((e) => {
      console.error('CheckID server error', e);
      return false;
    })
  // 응답 반환(로그인 반환 값과 일치시킴)
  const isOk = isDuplicatedID ? 'OK' : 'ERROR';
  res.send(isOk)
})

// 회원탈퇴
app.post('/delete/account', async (req, res) => {
  try {
    // 쿠키 가져오기
    const loginCookie = JSON.parse(req.cookies.login);
    const loginID = loginCookie.id
    // Redis 삭제
    await client.del(loginID);
    // Redis 확인
    const isDeletedOnRedis = await client.get(loginID);
    if (isDeletedOnRedis) throw new Error(`${isDeletedOnRedis} is not deleted on Redis`);
    // DB 삭제
    await remove(ref(db, `users/${loginID}`));
    // DB 확인
    await get(child(ref(db), `users/${loginID}`))
      .then((snapshot) => {
        if (snapshot.val()) throw new Error(`${loginID} is not deleted on Firebase`);
      });
    // 정상 응답
    res.clearCookie().send('OK');
  } catch (err) {
    // 실패 응답, 서버 오류
    console.error('Delete account server error : ', err);
    res.send('SERVER ERROR')
  }
})

// Redis DB 목록 확인
app.get('/redis', async (req, res) => {
  const redisKey = await client.keys('*');
  const data = redisKey.length ? {} : { '0': 'empty' };
  for (let i = 0; i < redisKey.length; i++) {
    data[redisKey[i]] = await client.get(redisKey[i]);
  }
  res.json(data);
})

// Redis 세션ID 검증
app.post('/redis/exist', async (req, res) => {
  try {
    const loginCookie = req.cookies?.login ? JSON.parse(req.cookies.login) : null;
    const userID = loginCookie ? loginCookie.id : null;
    const sessionID = loginCookie ? loginCookie.sessionID : null;
    // 세션ID 없는 상태로 접근하면 홈으로 이동 
    if (!userID || !sessionID) return res.send('ERROR');
    // Redis, 세션ID 검증
    const redisSessionID = await client.get(userID);
    const isValidSessionID = sessionID === redisSessionID;
    // 응답 전달
    if (isValidSessionID) return res.send('OK');
    return res.send('ERROR');
  } catch (err) {
    console.error('Redis exist server error', err);
    return res.send('ERROR');
  }
})


app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
})
