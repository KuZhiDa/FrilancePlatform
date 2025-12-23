import { Test, type TestingModule } from '@nestjs/testing';
import { TwoFaController } from '../two_factor.controller';
import { TwoFAService } from '../two_factor.service';
import { mockResponse, mockTwoFAService } from './two_factor.mock';
import type { Response } from 'express';

describe('TwoFAController', () => {
  let controller: TwoFaController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TwoFaController],
      providers: [{ provide: TwoFAService, useValue: mockTwoFAService }],
    }).compile();

    controller = module.get(TwoFaController);
  });

  describe('postAcceptedCode', () => {
    it('should return access token', async () => {
      mockTwoFAService.checkAcceptedCode.mockResolvedValue({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
      const res = mockResponse();
      const result = await controller.postAcceptedCode(
        {
          id: 2,
          role: 'E',
          code: '123456',
        },
        res as any,
      );
      expect(result).toEqual({
        access: 'accessToken',
        message: 'Двухфакторная аутентификация пройдена.',
      });
    });
  });
});
