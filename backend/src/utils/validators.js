const isValidObjectId = (id) =>
  /^[0-9a-fA-F]{24}$/.test(String(id));

module.exports = { isValidObjectId };