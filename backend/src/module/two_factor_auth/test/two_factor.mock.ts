export const mockUserModel = {
  findOne: jest.fn(),
};

export const mockTokenService = {
  genAccessRefresh: jest.fn(),
};

export const mockRedis = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
};

export const mockTwoFAService = {
  checkAcceptedCode: jest.fn(),
};

export const mockResponse = () => ({
  cookie: jest.fn(),
});
