import { Errors } from '../../errors/errors';
import { Money } from '../value-objects/money';

export function calculateTotalWithIgv(_subtotal: Money, _igv: Money): Money {
  throw Errors.notImplemented('calculateTotalWithIgv');
}
