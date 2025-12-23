import { Test, type TestingModule } from '@nestjs/testing';
import { PasswordRecoveryService } from '../pass_recovery.service';
import { getModelToken } from '@nestjs/sequelize';
import { User } from '../../../model/users/users.model';
import {
  mockEmailService,
  mockTokenService,
  mockUserModel,
} from './pas_recovery.mock';
import { TokenService } from '../../../module/token/token.service';
import { EmailService } from '../../../module/email/email.service';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hash_password'),
}));

describe('PasswordRecoveryService', () => {
  let service: PasswordRecoveryService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordRecoveryService,
        { provide: getModelToken(User), useValue: mockUserModel },
        { provide: TokenService, useValue: mockTokenService },
        { provide: EmailService, useValue: mockEmailService },
      ],
    }).compile();

    service = module.get(PasswordRecoveryService);
  });

  describe('sendEmailPassword', () => {
    it('should successfully send password recovery email for an active user', async () => {
      mockUserModel.findOne.mockResolvedValue({
        dataValues: {
          id: 2,
          username: 'Dimasik',
          isActivate: true,
        },
      });
      mockTokenService.createToken.mockResolvedValue('token');
      mockEmailService.messageToEmail.mockResolvedValue(true);

      const result = await service.sendEmailPassword('Dimasik');

      expect(result).toEqual({
        message: 'На почту отправлена ссылка для сброса пароля.',
      });
    });

    it('should throw an error if user does not exist', async () => {
      mockUserModel.findOne.mockResolvedValue(null);

      await expect(service.sendEmailPassword('Dimasik')).rejects.toThrow(
        'Пользователя с такими данными не существует.',
      );
    });

    it('should throw an error if user email is not confirmed', async () => {
      mockUserModel.findOne.mockResolvedValue({
        dataValues: {
          id: 2,
          username: 'Dimasik',
          isActivate: false,
        },
      });

      await expect(service.sendEmailPassword('Dimasik')).rejects.toThrow(
        'Не было подтверждения почты.',
      );
    });
  });

  describe('updatePassword', () => {
    it('should successfully update password if token is valid', async () => {
      mockTokenService.proofToken.mockResolvedValue(true);
      mockUserModel.findOne.mockResolvedValue({
        dataValues: {
          id: 2,
          username: 'Dimasik',
          isActivate: true,
        },
      });
      mockUserModel.update.mockResolvedValue(true);

      const result = await service.updatePassword({
        token: 'token',
        password: '123456',
      });

      expect(result).toEqual({ message: 'Пароль обновлен.' });
    });

    it('should throw an error if token has expired', async () => {
      mockTokenService.proofToken.mockRejectedValue({
        name: 'TokenExpiredError',
      });

      await expect(
        service.updatePassword({
          token: 'token',
          password: '123456',
        }),
      ).rejects.toThrow('Время на смену пароля истекло.');
    });

    it('should throw an error if token is invalid', async () => {
      mockTokenService.proofToken.mockRejectedValue({
        name: 'JsonWebTokenError',
      });

      await expect(
        service.updatePassword({
          token: 'token',
          password: '123456',
        }),
      ).rejects.toThrow('Токен не валиден.');
    });

    it('should throw an error if user with provided id does not exist', async () => {
      mockTokenService.proofToken.mockResolvedValue(true);
      mockUserModel.findOne.mockResolvedValue(null);

      await expect(
        service.updatePassword({
          token: 'token',
          password: '123456',
        }),
      ).rejects.toThrow('Пользователя с таким id нет.');
    });
  });
});
