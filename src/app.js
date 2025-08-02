import dotenv from "dotenv";

// NODE_ENV 분기 설정
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env";
dotenv.config({ path: envFile });

import cors from "cors";
import express from "express";

import passport from "./modules/user/kakao.strategy.js";
import userRoutes from "./routes/user.route.js";
import homeRouter from "./routes/home.route.js";
import outfitRoutes from "./routes/outfit.route.js";
import calendarRoute from "./routes/calendar.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import wardrobeRouter from "./routes/wardrobe.route.js";
import itemsRouter from "./routes/item.route.js";
import modelRouter from "./routes/model.route.js";
import locationRouter from "./routes/location.route.js";
import communityRouter from "./routes/community.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// 라우터 등록
app.use("/user", userRoutes);
app.use(homeRouter);
app.use(outfitRoutes);
app.use("/calendar", calendarRoute);
app.use("/wardrobe", wardrobeRouter);
app.use("/location", locationRouter);
app.use("/items", itemsRouter);
app.use("/model", modelRouter);
app.use("/community", communityRouter);

// 에러 핸들러
app.use(errorHandler);

// 서버 상태 확인
app.get("/", (req, res) => {
  res.send("서버 정상 작동 중!");
});

// 서버 실행
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});
