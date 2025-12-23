"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockEmailService = exports.mockTwoFAService = exports.mockTokenService = exports.mockTokenModel = exports.mockUserModel = void 0;
exports.mockUserModel = {
    findOne: jest.fn(),
    create: jest.fn(),
};
exports.mockTokenModel = {
    destroy: jest.fn(),
};
exports.mockTokenService = {
    genAccessRefresh: jest.fn(),
    proofToken: jest.fn(),
};
exports.mockTwoFAService = {
    genCode: jest.fn(),
};
exports.mockEmailService = {
    messageToEmail: jest.fn(),
};
//# sourceMappingURL=auth.mock.js.map