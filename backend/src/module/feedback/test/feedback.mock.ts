export const mockFeedbackModel = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  destroy: jest.fn(),
};

export const mockCustomerPostModel = {
  findOne: jest.fn(),
};

export const mockCheckService = {
  user: jest.fn(),
};

export const mockProjectService = {
  addProject: jest.fn(),
};

export const mockPostService = {
  deletePost: jest.fn(),
};
