export const mockUserModel = {
  findOne: jest.fn(),
  update: jest.fn(),
};

export const mockTokenService = {
  createToken: jest.fn(),
  proofToken: jest.fn(),
};

export const mockEmailService = {
  messageToEmail: jest.fn(),
};
