import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTransactionCommand } from '../../../application/create-transaction/create-transaction.command';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { CreateTransactionHandler } from '../../../application/create-transaction/create-transaction.handler';
import { GetTransactionByIdHandler } from '../../../application/get-transaction-by-id/get-transaction-by-id.handler';
import { GetTransactionByIdQuery } from '../../../application/get-transaction-by-id/get-transaction-by-id.query';
import { ListTransactionsHandler } from '../../../application/list-transactions/list-transactions.handler';
import { ListTransactionsQuery } from '../../../application/list-transactions/list-transactions.query';
import { UpdateTransactionStatusCommand } from '../../../application/update-transaction-status/update-transaction-status.command';
import { UpdateTransactionStatusDto } from '../dtos/update-transaction-status.dto';
import { UpdateTransactionStatusHandler } from '../../../application/update-transaction-status/update-transaction-status.handler';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly createTransactionHandler: CreateTransactionHandler,
    private readonly getTransactionByIdHandler: GetTransactionByIdHandler,
    private readonly listTransactionsHandler: ListTransactionsHandler,
    private readonly updateTransactionStatusHandler: UpdateTransactionStatusHandler,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create transaction' })
  @ApiResponse({ status: 201 })
  create(@Body() body: CreateTransactionDto) {
    return this.createTransactionHandler.execute(
      new CreateTransactionCommand(
        body.accountId,
        body.amount,
        body.currency,
        body.type,
        body.externalReference,
      ),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction by id' })
  @ApiResponse({ status: 200 })
  findById(@Param('id') id: string) {
    return this.getTransactionByIdHandler.execute(new GetTransactionByIdQuery(id));
  }

  @Get()
  @ApiOperation({ summary: 'List transactions' })
  @ApiResponse({ status: 200 })
  list() {
    return this.listTransactionsHandler.execute(new ListTransactionsQuery());
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update transaction status' })
  @ApiResponse({ status: 200 })
  updateStatus(@Param('id') id: string, @Body() body: UpdateTransactionStatusDto) {
    return this.updateTransactionStatusHandler.execute(
      new UpdateTransactionStatusCommand(id, body.status),
    );
  }
}
