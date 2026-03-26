import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { TransactionStatus } from '../transaction-status.enum';

export class UpdateTransactionStatusDto {
  @ApiProperty({ enum: TransactionStatus, example: TransactionStatus.APPROVED })
  @IsEnum(TransactionStatus)
  status!: TransactionStatus;
}
