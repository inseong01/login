import dotenv from "dotenv";
import { createClient } from "redis";
dotenv.config();

const redisInit = {
  password: process.env.PASSWORD,
  socket: {
    host: process.env.HOST,
    port: process.env.PORT
  },
  legacyMode: true
}

let client;

async function clientStart() {
  if (!client) {
    client = createClient(redisInit);
    client.on('connect', () => {
      console.log('Connected to Redis...');
    });
    client.on('error', (err) => {
      console.error('Redis error:', err)
    });
    await client.set('1', '222')
    const a = await client.get('1')
    console.log(a);
    await client.connect();
  }
  return client;
}

export default clientStart;