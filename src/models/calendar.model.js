const outfitsDb = new Map();

// 데이터 없이 빈 DB만 유지
exports.get = (date) => outfitsDb.get(date);
exports.has = (date) => outfitsDb.has(date);
exports.set = (date, value) => outfitsDb.set(date, value);
exports.delete = (date) => outfitsDb.delete(date);
