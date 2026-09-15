const createMongooseMock = () => {
  const baseQuery = {
    sort: jest.fn().mockReturnThis(),
    populate: jest.fn().mockReturnThis(),
    exec: jest.fn(),
    select: jest.fn().mockReturnThis()
  };

  const mockModel = function Model() {};
  mockModel.create = jest.fn();
  mockModel.find = jest.fn(() => baseQuery);
  mockModel.findById = jest.fn();
  mockModel.findByIdAndUpdate = jest.fn();
  mockModel.findByIdAndDelete = jest.fn();
  mockModel.findOne = jest.fn();
  mockModel.exists = jest.fn();
  mockModel.countDocuments = jest.fn();
  mockModel.distinct = jest.fn();
  mockModel.prototype.save = jest.fn();

  return mockModel;
};

module.exports = { createMongooseMock };