import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, Min } from 'class-validator';
import { TransactionType } from '../transaction-type.enum';

export class CreateTransactionDto {
  @ApiProperty({ example: 'acc_123' })
  @IsString()
  accountId!: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @Min(0.01)
  amount!: number;

  @ApiProperty({ example: 'PEN' })
  @IsString()
  currency!: string;

  @ApiProperty({ enum: TransactionType, example: TransactionType.DEBIT })
  @IsEnum(TransactionType)
  type!: TransactionType;

  @ApiProperty({ example: 'ext_001' })
  @IsString()
  externalReference!: string;
}
