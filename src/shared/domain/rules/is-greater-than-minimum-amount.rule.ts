import { Errors } from '../../errors/errors';
import { Money } from '../value-objects/money';

export function isGreaterThanMinimumAmount(_money: Money, _minimum: Money): boolean {
  throw Errors.notImplemented('isGreaterThanMinimumAmount');
}
