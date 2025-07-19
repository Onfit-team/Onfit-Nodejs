import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// (1) 로그인한 유저(토큰 필수)만 통과
export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: '인증 토큰이 필요합니다.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { userId, role, ... }
    next();
  } catch (err) {
    return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
  }
};

// (2) 관리자 전용 라우트(토큰+role=admin만 통과)
export const requireAdmin = (req, res, next) => {
  // authenticateJWT 먼저 실행되어야 req.user가 셋팅됨!
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: '관리자 권한 필요' });
  }
  next();
};
