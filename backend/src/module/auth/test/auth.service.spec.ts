import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { DtoForReg } from '../dto/dto.register';
import {
  mockEmailService,
  mockTokenModel,
  mockTokenService,
  mockTwoFAService,
  mockUserModel,
} from './auth.mock';
import { RefreshToken } from '../../../model/users/token.model';
import { TokenService } from '../../../module/token/token.service';
import { getModelToken } from '@nestjs/sequelize';
import { User } from '../../../model/users/users.model';
import { TwoFAService } from '../../two_factor_auth/two_factor.service';
import { EmailService } from '../../email/email.service';
import { DtoForLog } from '../dto/dto.login';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hash_password'),
  compare: jest.fn().mockResolvedValue(true),
}));

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getModelToken(User), useValue: mockUserModel },
        { provide: getModelToken(RefreshToken), useValue: mockTokenModel },
        { provide: TokenService, useValue: mockTokenService },
        { provide: TwoFAService, useValue: mockTwoFAService },
        { provide: EmailService, useValue: mockEmailService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  describe('registerUser', () => {
    const dto: DtoForReg = {
      username: 'Dimasik',
      email: 'dimadima228@yandex.ru',
      password: 'password',
      is2Fa: false,
    };

    it('should create a new user when the user does not exist', async () => {
      mockUserModel.findOne.mockResolvedValue(null);
      mockUserModel.create.mockResolvedValue({
        dataValues: {
          username: 'Dimasik',
          email: 'dimadima228@yandex.ru',
          password: 'hash_password',
        },
      });

      const result = await service.registerUser(dto);

      expect(result).toEqual({
        username: 'Dimasik',
        email: 'dimadima228@yandex.ru',
      });
    });

    it('should throw an error if the user already exists', async () => {
      mockUserModel.findOne.mockResolvedValue({
        dataValues: { id: 2, username: 'Anton' },
      });

      await expect(service.registerUser(dto)).rejects.toThrow(
        'Пользователь с такими данными уже существует.',
      );
    });
  });

  describe('loginUser', () => {
    const dto: DtoForLog = {
      login: 'Dimasik',
      password: 'password',
      role_user: 'E',
    };

    it('should login successfully for a user without 2FA', async () => {
      mockUserModel.findOne.mockResolvedValue({
        dataValues: { id: 2, username: 'Dimasik', is2Fa: false },
      });
      mockTokenService.genAccessRefresh.mockResolvedValue({
        accessToken: 'sdsd',
        refreshToken: 'sdsd',
      });

      const result = await service.loginUser(dto);

      expect(result).toEqual({
        id_user: 2,
        role: 'E',
        is2Fa: false,
        accessToken: 'sdsd',
        refreshToken: 'sdsd',
        message: 'Пользователь Dimasik авторизован.',
      });
    });

    it('should initiate 2FA login for a user with 2FA enabled', async () => {
      mockUserModel.findOne.mockResolvedValue({
        dataValues: { id: 2, username: 'Dimasik', is2Fa: true },
      });
      mockTwoFAService.genCode.mockResolvedValue('234567');
      mockEmailService.messageToEmail.mockResolvedValue(true);

      const result = await service.loginUser(dto);

      expect(result).toEqual({
        id_user: 2,
        role: 'E',
        is2Fa: true,
        message: 'Сообщение направленно на почту для подтверждения входа.',
      });
    });

    it('should throw an error if the user does not exist', async () => {
      mockUserModel.findOne.mockResolvedValue(null);

      await expect(service.loginUser(dto)).rejects.toThrow(
        'Пользователя с такими данными не существует.',
      );
    });
  });

  describe('logoutUser', () => {
    it('should successfully logout a user', async () => {
      mockTokenService.proofToken.mockResolvedValue({ id: 2, id_user: 3 });
      mockTokenModel.destroy.mockResolvedValue(true);

      const result = await service.logoutUser('refresh');

      expect(result).toEqual({ message: 'Пользователь вышел.' });
    });

    it('should throw an error if no refresh token is provided', async () => {
      await expect(service.logoutUser('')).rejects.toThrow(
        'Refresh токена нет.',
      );
    });

    it('should throw an error if the refresh token is invalid', async () => {
      mockTokenService.proofToken.mockRejectedValue(new Error('Err'));

      await expect(service.logoutUser('refresh_token')).rejects.toThrow(
        'Ошибка валидности refresh токена',
      );
    });
  });
});
