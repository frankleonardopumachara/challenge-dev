import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { GlobalExceptionFilter } from '../../../src/shared/filters/global-exception.filter';
import { DataResponseInterceptor } from '../../../src/shared/interceptors/data-response.interceptor';


describe('GET /transactions/:id (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }));
    app.useGlobalFilters(new GlobalExceptionFilter());
    app.useGlobalInterceptors(new DataResponseInterceptor());
    await app.init();

    const createResponse = await request(app.getHttpServer())
      .post('/transactions')
      .send({
        accountId: 'acc_456',
        amount: 100,
        currency: 'PEN',
        type: 'credit',
        externalReference: 'ext_e2e_get_001',
      });

    createdId = createResponse.body.data.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return a transaction by id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/transactions/${createdId}`)
      .expect(200);

    expect(response.body.data.id).toBe(createdId);
    expect(response.body.data.externalReference).toBe('ext_e2e_get_001');
  });
});
