import { Errors } from '../../errors/errors';
import { Money } from '../value-objects/money';

export function calculateIgv(_subtotal: Money): Money {
  throw Errors.notImplemented('calculateIgv');
}
