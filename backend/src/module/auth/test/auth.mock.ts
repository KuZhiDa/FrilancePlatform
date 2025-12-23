export const mockUserModel = {
  findOne: jest.fn(),
  create: jest.fn(),
};

export const mockTokenModel = {
  destroy: jest.fn(),
};

export const mockTokenService = {
  genAccessRefresh: jest.fn(),
  proofToken: jest.fn(),
};

export const mockTwoFAService = {
  genCode: jest.fn(),
};

export const mockEmailService = {
  messageToEmail: jest.fn(),
};
