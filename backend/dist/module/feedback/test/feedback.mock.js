"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockPostService = exports.mockProjectService = exports.mockCheckService = exports.mockCustomerPostModel = exports.mockFeedbackModel = void 0;
exports.mockFeedbackModel = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    destroy: jest.fn(),
};
exports.mockCustomerPostModel = {
    findOne: jest.fn(),
};
exports.mockCheckService = {
    user: jest.fn(),
};
exports.mockProjectService = {
    addProject: jest.fn(),
};
exports.mockPostService = {
    deletePost: jest.fn(),
};
//# sourceMappingURL=feedback.mock.js.map