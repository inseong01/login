import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import clientStart from './clientStart.js';

const app = express();
const port = 3003;

// Redis
const client = clientStart(); // set() is not a function 오류

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  console.log('this is /');
  res.send('Hello');
})

// 서버 처리
app.post('/login', async (req, res) => {
  // 정보 받음
  const { id, password } = req.body
  let isLogin = false;

  // DB에서 정보 확인
  if (Number(id) === 111111 || Number(password) === 22222222) {
    // 세션ID 발급  
    const sesstionID = uuidv4();
    // Redis, 세션ID 추가
    await client.set(id, sesstionID);
    isLogin = true;
  }

  // 로그인 결과 전달
  const sesstionID = isLogin ? null : await client.get(id)
  res.send({ 'isCorrect': isLogin, sesstionID })
})

// Redis 데이터베이스 확인
app.get('/redis', async () => {
  const list = await client.keys('*');
  res.json(list);
})


app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
})
