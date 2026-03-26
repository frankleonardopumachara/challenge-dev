/**
 * DDD FUNCIONAL (Domain-Driven Design + Functional)
 * Cómo usar Tipos para modelar el dominio sin clases gigantes.
 */

// 1. EL LENGUAJE UBICUO (Tipos como Documentación)
export type Currency = 'PEN' | 'USD';
export type Money = { amount: number; currency: Currency };

// 2. AGGREGATES COMO DATOS (POJOs)
export type Wallet = {
  id: string;
  ownerId: string;
  balance: Money;
};

// 3. REGLAS DE DOMINIO (Cálculos Puros)
export const hasSufficientFunds = (wallet: Wallet, charge: Money): boolean => {
  if (wallet.balance.currency !== charge.currency) return false;
  return wallet.balance.amount >= charge.amount;
};

// 4. TRANSFORMACIÓN DEL DOMINIO (En lugar de métodos de clase)
export const withdraw = (wallet: Wallet, charge: Money): Wallet => {
  if (!hasSufficientFunds(wallet, charge)) throw new Error('Insuficiente');
  
  return {
    ...wallet,
    balance: {
      ...wallet.balance,
      amount: wallet.balance.amount - charge.amount
    }
  };
};

/**
 * 🧠 LECCIÓN:
 * En DDD tradicional, tendrías una clase 'Wallet' con métodos.
 * En DDD Funcional, tienes DATOS (Wallet) y FUNCIONES (withdraw).
 * Es más fácil de serializar, compartir y testear.
 */
