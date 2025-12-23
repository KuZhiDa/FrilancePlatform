"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockResponse = exports.mockTwoFAService = exports.mockRedis = exports.mockTokenService = exports.mockUserModel = void 0;
exports.mockUserModel = {
    findOne: jest.fn(),
};
exports.mockTokenService = {
    genAccessRefresh: jest.fn(),
};
exports.mockRedis = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
};
exports.mockTwoFAService = {
    checkAcceptedCode: jest.fn(),
};
const mockResponse = () => ({
    cookie: jest.fn(),
});
exports.mockResponse = mockResponse;
//# sourceMappingURL=two_factor.mock.js.map