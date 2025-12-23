export declare const mockUserModel: {
    findOne: jest.Mock<any, any, any>;
};
export declare const mockTokenService: {
    genAccessRefresh: jest.Mock<any, any, any>;
};
export declare const mockRedis: {
    get: jest.Mock<any, any, any>;
    set: jest.Mock<any, any, any>;
    del: jest.Mock<any, any, any>;
};
export declare const mockTwoFAService: {
    checkAcceptedCode: jest.Mock<any, any, any>;
};
export declare const mockResponse: () => {
    cookie: jest.Mock<any, any, any>;
};
