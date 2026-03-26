import { Errors } from '../../errors/errors';

export class Money {
  private constructor(
    private readonly _amount: number,
    private readonly _currency: string,
  ) {}

  static create(amount: number, currency: string = 'PEN'): Money {
    if (amount === null || amount === undefined || Number.isNaN(amount)) {
      throw Errors.invalidAmount();
    }

    if (!currency || currency.trim().length !== 3) {
      throw Errors.invalidCurrency();
    }

    if (amount <= 0) {
      throw Errors.invalidAmount();
    }

    return new Money(Number(amount), currency.trim().toUpperCase());
  }

  get amount(): number {
    return this._amount;
  }

  get currency(): string {
    return this._currency;
  }

  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(Number((this._amount + other._amount).toFixed(2)), this._currency);
  }

  multiply(factor: number): Money {
    return new Money(Number((this._amount * factor).toFixed(2)), this._currency);
  }

  greaterThan(other: Money): boolean {
    this.assertSameCurrency(other);
    return this._amount > other._amount;
  }

  private assertSameCurrency(other: Money): void {
    if (this._currency !== other._currency) {
      throw Errors.invalidCurrency();
    }
  }
}
