import { Money } from '../../../../src/shared/domain/value-objects/money';
import { calculateIgv } from '../../../../src/shared/domain/rules/calculate-igv.rule';

describe('calculateIgv', () => {
  it('should return 18% of the subtotal preserving currency', () => {
    const subtotal = Money.create(100, 'PEN');

    const result = calculateIgv(subtotal);

    expect(result.amount).toBe(18);
    expect(result.currency).toBe('PEN');
  });
});
