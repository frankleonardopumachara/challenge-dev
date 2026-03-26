import { Money } from '../../../../src/shared/domain/value-objects/money';
import { calculateTotalWithIgv } from '../../../../src/shared/domain/rules/calculate-total-with-igv.rule';

describe('calculateTotalWithIgv', () => {
  it('should return subtotal plus igv', () => {
    const subtotal = Money.create(100, 'PEN');
    const igv = Money.create(18, 'PEN');

    const result = calculateTotalWithIgv(subtotal, igv);

    expect(result.amount).toBe(118);
    expect(result.currency).toBe('PEN');
  });
});
