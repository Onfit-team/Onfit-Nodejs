import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

<<<<<<< HEAD
redisClient.on('error', (err) => {
  console.error('❌ Redis 연결 오류:', err);
});

redisClient.on('connect', () => {
  console.log('✅ Redis connected');
});

redisClient.connect();
=======
redisClient.on('error', (err) => console.error('Redis Client Error', err));

await redisClient.connect();
>>>>>>> main

export default redisClient;
