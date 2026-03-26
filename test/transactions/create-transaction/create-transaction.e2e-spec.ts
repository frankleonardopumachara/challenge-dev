import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { GlobalExceptionFilter } from '../../../src/shared/filters/global-exception.filter';
import { DataResponseInterceptor } from '../../../src/shared/interceptors/data-response.interceptor';


describe('POST /transactions (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }));
    app.useGlobalFilters(new GlobalExceptionFilter());
    app.useGlobalInterceptors(new DataResponseInterceptor());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a transaction', async () => {
    const response = await request(app.getHttpServer())
      .post('/transactions')
      .send({
        accountId: 'acc_123',
        amount: 100,
        currency: 'PEN',
        type: 'debit',
        externalReference: 'ext_e2e_create_001',
      })
      .expect(201);

    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.accountId).toBe('acc_123');
    expect(response.body.data.igvAmount).toBe(18);
    expect(response.body.data.totalAmount).toBe(118);
  });
});
