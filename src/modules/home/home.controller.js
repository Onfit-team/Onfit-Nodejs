const homeService = require('./home.service');
exports.getCurrentDate = (req, res) => {
  const date = homeService.getCurrentDate();
  res.status(200).json({
    resultType: 'SUCCESS',
    successType: 'DEFAULT',
    error: null,
    success: { date }
  });
};