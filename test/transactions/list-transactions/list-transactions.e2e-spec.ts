import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { GlobalExceptionFilter } from '../../../src/shared/filters/global-exception.filter';
import { DataResponseInterceptor } from '../../../src/shared/interceptors/data-response.interceptor';


describe('GET /transactions (e2e)', () => {
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

    await request(app.getHttpServer())
      .post('/transactions')
      .send({
        accountId: 'acc_789',
        amount: 100,
        currency: 'PEN',
        type: 'debit',
        externalReference: 'ext_e2e_list_001',
      });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should list transactions', async () => {
    const response = await request(app.getHttpServer())
      .get('/transactions')
      .expect(200);

    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
