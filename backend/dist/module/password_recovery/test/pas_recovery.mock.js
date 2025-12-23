"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockEmailService = exports.mockTokenService = exports.mockUserModel = void 0;
exports.mockUserModel = {
    findOne: jest.fn(),
    update: jest.fn(),
};
exports.mockTokenService = {
    createToken: jest.fn(),
    proofToken: jest.fn(),
};
exports.mockEmailService = {
    messageToEmail: jest.fn(),
};
//# sourceMappingURL=pas_recovery.mock.js.map