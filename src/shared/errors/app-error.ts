import { ErrorCode } from './error-code.enum';

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
  }
}
