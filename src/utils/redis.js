import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://redis:6379"
});

redisClient.on("error", (err) => console.error("[Redis] 연결 오류", err));
redisClient.on("connect", () => console.log("[Redis] 연결 성공"));

await redisClient.connect();

export default redisClient;
