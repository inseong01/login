import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import dotenv from "dotenv";
import { createClient } from "redis";
import cookieParser from 'cookie-parser';
import { initializeApp } from "firebase/app";
import { child, get, getDatabase, onValue, ref, set } from "firebase/database";
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
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
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
    { 'id': id, 'sessionID': sessionID },
    { httpOnly: true, secure: true, path: '/', maxAge: 30000 }
  ).sendStatus(200);
})

// 로그아웃
app.post('/logout', async (req, res) => {
  // 정보 받음
  const { id } = req.cookies?.login;
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

// Redis 데이터베이스 확인
app.get('/redis', async (req, res) => {
  const data = {};
  const key = await client.keys('*');
  for (let i = 0; i < key.length; i++) {
    data[key[i]] = await client.get(key[i]);
  }
  res.json(data);
})


app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
})
