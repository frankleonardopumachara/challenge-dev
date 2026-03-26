import { HttpStatus } from '@nestjs/common';
import { AppError } from './app-error';
import { ErrorCode } from './error-code.enum';

export const Errors = {
  invalidCurrency: () =>
    new AppError(
      ErrorCode.INVALID_CURRENCY,
      HttpStatus.BAD_REQUEST,
      'Currency is invalid',
    ),
  invalidAmount: () =>
    new AppError(
      ErrorCode.INVALID_AMOUNT,
      HttpStatus.BAD_REQUEST,
      'Amount must be greater than 0',
    ),
  transactionAlreadyExists: () =>
    new AppError(
      ErrorCode.TRANSACTION_ALREADY_EXISTS,
      HttpStatus.CONFLICT,
      'Transaction already exists',
    ),
  transactionNotFound: () =>
    new AppError(
      ErrorCode.TRANSACTION_NOT_FOUND,
      HttpStatus.NOT_FOUND,
      'Transaction not found',
    ),
  invalidTransactionStatus: () =>
    new AppError(
      ErrorCode.INVALID_TRANSACTION_STATUS,
      HttpStatus.BAD_REQUEST,
      'Transaction status transition is invalid',
    ),
  notImplemented: (name: string) =>
    new AppError(
      ErrorCode.NOT_IMPLEMENTED,
      HttpStatus.INTERNAL_SERVER_ERROR,
      `${name} is not implemented`,
    ),
};
