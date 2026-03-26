/**
 * MODELADO FUNCIONAL DEL DOMINIO
 * El libro nos enseña a modelar usando REGLAS (Cálculos) y HECHOS (Datos).
 */

// 🟡 DATOS: Representan el estado de una transacción en un momento dado.
export interface Transaction {
  id: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

// 🔵 CÁLCULOS: Reglas de negocio puras.
// Son el corazón del dominio. No dependen de la base de datos.

// REGLA: ¿Es una transacción válida para ser aprobada?
export const canApprove = (transaction: Transaction): boolean => {
  return transaction.status === 'PENDING' && transaction.amount > 0;
};

// REGLA: ¿Cómo cambia el saldo según la transacción?
// Observa: Recibimos el saldo actual y devolvemos el saldo NUEVO.
// No modificamos nada (inmutabilidad).
export const nextBalance = (currentBalance: number, transaction: Transaction): number => {
  if (transaction.type === 'CREDIT') {
    return currentBalance + transaction.amount;
  }
  return currentBalance - transaction.amount;
};

// REGLA: Generar un nuevo estado de transacción (Transformación de datos).
export const approveTransaction = (transaction: Transaction): Transaction => {
  if (!canApprove(transaction)) {
    throw new Error('Transaction cannot be approved');
  }
  
  // Devolvemos una COPIA de la transacción con el nuevo estado.
  // Esto es fundamental en el modelado funcional: DATOS ENTRAN, DATOS SALEN.
  return {
    ...transaction,
    status: 'APPROVED',
  };
};

/**
 * 🧠 LECCIÓN:
 * El dominio funcional no se modela con clases que guardan estado.
 * Se modela con:
 * 1. Tipos de datos que representan estados válidos (Interfaces).
 * 2. Funciones puras que transforman un estado en el siguiente (Cálculos).
 */
