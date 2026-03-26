import { Money } from '../../../../src/shared/domain/value-objects/money';
import { isGreaterThanMinimumAmount } from '../../../../src/shared/domain/rules/is-greater-than-minimum-amount.rule';

describe('isGreaterThanMinimumAmount', () => {
  it('should return true when amount is strictly greater than minimum', () => {
    const amount = Money.create(10, 'PEN');
    const minimum = Money.create(1, 'PEN');

    const result = isGreaterThanMinimumAmount(amount, minimum);

    expect(result).toBe(true);
  });

  it('should return false when amount is equal to the minimum', () => {
    const amount = Money.create(1, 'PEN');
    const minimum = Money.create(1, 'PEN');

    const result = isGreaterThanMinimumAmount(amount, minimum);

    expect(result).toBe(false);
  });
});
