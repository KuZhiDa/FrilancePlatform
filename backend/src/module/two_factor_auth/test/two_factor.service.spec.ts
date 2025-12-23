import { Test, type TestingModule } from '@nestjs/testing';
import { TwoFAService } from '../two_factor.service';
import { getModelToken } from '@nestjs/sequelize';
import { User } from 'src/model/users/users.model';
import { mockRedis, mockTokenService, mockUserModel } from './two_factor.mock';
import { TokenService } from '../../../module/token/token.service';
import { getRedisConnectionToken } from '@nestjs-modules/ioredis';

describe('TwoFAService', () => {
  let service: TwoFAService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TwoFAService,
        { provide: getModelToken(User), useValue: mockUserModel },
        { provide: TokenService, useValue: mockTokenService },
        { provide: getRedisConnectionToken(), useValue: mockRedis },
      ],
    }).compile();

    service = module.get(TwoFAService);
  });

  describe('genCode', () => {
    it('should generate a new 2FA code and delete existing code if present', async () => {
      mockRedis.get.mockResolvedValue('234356');
      mockRedis.set.mockResolvedValue(true);

      const result = await service.genCode(3);

      expect(result).toHaveLength(6);
    });

    it('should generate a new 2FA code when no existing code is present', async () => {
      mockRedis.get.mockResolvedValue(null);
      mockRedis.set.mockResolvedValue(true);

      const result = await service.genCode(3);

      expect(result).toHaveLength(6);
    });
  });

  describe('proofCode', () => {
    it('should successfully validate the correct 2FA code', async () => {
      mockRedis.get.mockResolvedValue('123456');
      mockRedis.del.mockResolvedValue(true);

      const result = await service.proofCode(3, '123456');

      expect(result).toEqual(true);
    });

    it('should throw an error if the 2FA code does not exist in Redis', async () => {
      mockRedis.get.mockResolvedValue(null);

      await expect(service.proofCode(3, '123456')).rejects.toThrow(
        'Кода нет или срок действия его истек.',
      );
    });

    it('should throw an error if the provided 2FA code is incorrect', async () => {
      mockRedis.get.mockResolvedValue('23456');

      await expect(service.proofCode(3, '123456')).rejects.toThrow(
        'Неверный код подтверждения.',
      );
    });
  });

  describe('checkAcceptedCode', () => {
    it('should return access and refresh tokens for valid code and existing user', async () => {
      jest.spyOn(service, 'proofCode').mockResolvedValue(true);
      mockUserModel.findOne.mockResolvedValue({ id: 2, username: 'Dimasik' });
      mockTokenService.genAccessRefresh.mockResolvedValue({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });

      const result = await service.checkAcceptedCode({
        id: 3,
        role: 'E',
        code: '123456',
      });

      expect(result).toEqual({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
    });

    it('should throw an error if proofCode returns false', async () => {
      jest.spyOn(service, 'proofCode').mockResolvedValue(false);

      await expect(
        service.checkAcceptedCode({
          id: 3,
          role: 'E',
          code: '123456',
        }),
      ).rejects.toThrow('Неверный код авторизации.');
    });

    it('should throw an error if user does not exist', async () => {
      jest.spyOn(service, 'proofCode').mockResolvedValue(true);
      mockUserModel.findOne.mockResolvedValue(null);

      await expect(
        service.checkAcceptedCode({
          id: 3,
          role: 'E',
          code: '123456',
        }),
      ).rejects.toThrow('Такого пользователя не существует.');
    });
  });
});
