# Transaction Challenge

Prueba técnica backend base en **NestJS + TypeORM + PostgreSQL**.

## Objetivo

Este repositorio ya viene preparado para ejecutar el proyecto. La persona candidata **no debe hacer setup del proyecto**. Su trabajo es **implementar lo que falta** respetando la estructura existente, los tests y la organización por vertical slicing.

## Stack

- NestJS
- TypeORM
- PostgreSQL
- Docker Compose
- Swagger
- DTOs con class-validator
- Vertical slicing

## Lo que ya está listo

- `docker-compose.yml` para levantar PostgreSQL
- archivo `.env`
- configuración TypeORM con `synchronize: true`
- Swagger en `/docs`
- `GlobalExceptionFilter`
- shape estándar de respuestas
- `AppError`, `Errors` factory y `ErrorCode` enum
- `runInTransaction` para handlers con múltiples escrituras
- endpoint de actualización de estado implementado
- tablas para:
  - `transactions`
  - `account_balance_summary`
  - `outbox_events`
- `Money` como Value Object compartido
- tests unitarios y e2e ya definidos en la carpeta `test`

## Estructura del proyecto

```txt
src/
  shared/
    domain/
      value-objects/
        money.ts
      rules/
        calculate-igv.rule.ts
        calculate-total-with-igv.rule.ts
        is-greater-than-minimum-amount.rule.ts
    errors/
    filters/
    interceptors/
  transactions/
    create-transaction/
    get-transaction-by-id/
    list-transactions/
    update-transaction-status/
    entities/
    repositories/
    transactions.controller.ts
    transactions.module.ts
  database/
  config/
  app.module.ts
  main.ts

test/
  shared/
    domain/
      rules/
  transactions/
    create-transaction/
    get-transaction-by-id/
    list-transactions/
```

## Lo que debes implementar

### 1. Reglas de negocio compartidas
Implementar estas funciones sin cambiar su firma:

- `calculateIgv`
- `calculateTotalWithIgv`
- `isGreaterThanMinimumAmount`

Estas reglas ya se usan dentro del `CreateTransactionHandler`. La idea es que la persona candidata complete la lógica para que el handler funcione correctamente.

### 2. Endpoints pendientes
Implementar sin cambiar los tests:

- `POST /transactions`
- `GET /transactions/:id`
- `GET /transactions`

## Restricciones

- No cambies la estructura general del proyecto.
- No cambies la firma pública de DTOs, handlers o reglas.
- No agregues ni modifiques tests.
- No quites Swagger, DTOs, logger, filtro global ni `runInTransaction`.
- Mantén el shape de respuesta definido por el proyecto.

## Scripts

```bash
npm install
npm run db:up
npm run start:dev
```

### Scripts disponibles

```bash
npm run db:up        # levanta PostgreSQL con Docker Compose
npm run db:down      # apaga los contenedores
npm run start:dev    # levanta la API en modo watch
npm run build        # build de producción
npm run test         # tests unitarios
npm run test:e2e     # tests e2e
npm run test:cov     # coverage
```

## Variables de entorno

El proyecto ya incluye `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=transactions_db
DB_SYNCHRONIZE=true
```

## Documentación Swagger

Una vez levantada la API:

- Swagger: `http://localhost:3000/docs`

## Shape de respuesta

### Success

```json
{
  "data": {}
}
```

### Error

```json
{
  "error": {
    "code": "TRANSACTION_ALREADY_EXISTS",
    "message": "Transaction already exists"
  }
}
```

## Endpoints

### 1. Crear transacción

`POST /transactions`

#### Input

```json
{
  "accountId": "acc_123",
  "amount": 100,
  "currency": "PEN",
  "type": "debit",
  "externalReference": "ext_001"
}
```

#### Output esperado

```json
{
  "data": {
    "id": "uuid",
    "accountId": "acc_123",
    "amount": 100,
    "currency": "PEN",
    "type": "debit",
    "status": "pending",
    "externalReference": "ext_001",
    "igvAmount": 18,
    "totalAmount": 118,
    "createdAt": "2026-03-24T10:00:00.000Z",
    "updatedAt": "2026-03-24T10:00:00.000Z"
  }
}
```

### 2. Obtener transacción por id

`GET /transactions/:id`

#### Output esperado

```json
{
  "data": {
    "id": "uuid",
    "accountId": "acc_123",
    "amount": 100,
    "currency": "PEN",
    "type": "debit",
    "status": "pending",
    "externalReference": "ext_001",
    "igvAmount": 18,
    "totalAmount": 118,
    "createdAt": "2026-03-24T10:00:00.000Z",
    "updatedAt": "2026-03-24T10:00:00.000Z"
  }
}
```

### 3. Listar transacciones

`GET /transactions`

#### Output esperado

```json
{
  "data": [
    {
      "id": "uuid",
      "accountId": "acc_123",
      "amount": 100,
      "currency": "PEN",
      "type": "debit",
      "status": "pending",
      "externalReference": "ext_001",
      "igvAmount": 18,
      "totalAmount": 118,
      "createdAt": "2026-03-24T10:00:00.000Z",
      "updatedAt": "2026-03-24T10:00:00.000Z"
    }
  ]
}
```

### 4. Actualizar estado de transacción

`PATCH /transactions/:id/status`

#### Input

```json
{
  "status": "approved"
}
```

#### Output esperado

```json
{
  "data": {
    "id": "uuid",
    "status": "approved"
  }
}
```
