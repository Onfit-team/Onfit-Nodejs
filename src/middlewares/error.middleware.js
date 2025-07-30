export const errorHandler = (err, req, res, next) => {
  if (err instanceof Error && err.errorCode && err.statusCode) {
    let statusCode = typeof err.statusCode === 'number' ? err.statusCode : parseInt(err.statusCode, 10);
    if (isNaN(statusCode)) statusCode = 500;
    res.status(statusCode).json({
      resultType: "FAIL",
      error: {
        errorCode: err.errorCode,
        reason: err.reason,
        data: err.data,
      },
      success: null,
    });
  } else {
    // 예상하지 못한 에러
    console.error('Unhandled Error:', err);
    res.status(500).json({
      resultType: "FAIL",
      error: {
        errorCode: "INTERNAL_SERVER_ERROR",
        reason: "알 수 없는 오류가 발생했습니다.",
        data: null,
      },
      success: null,
    });
  }
};
