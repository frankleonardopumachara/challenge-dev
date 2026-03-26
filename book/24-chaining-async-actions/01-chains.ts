/**
 * ENCADENAMIENTO DE ACCIONES (Action Chaining)
 * Grokking Simplicity enseña a tratar las acciones asíncronas
 * como una "cadena de montaje".
 */

// 1. LAS REGLAS (Cálculos)
const isApproved = (status: string) => status === 'approved';

// 2. LAS ACCIONES (Efectos secundarios asíncronos)
const sendNotification = async (userId: string) => {
  console.log(`Sending notification to ${userId}`);
};

const updateStats = async (amount: number) => {
  console.log(`Updating global stats with ${amount}`);
};

// 3. LA CADENA (Orquestador de Acciones)
export const onTransactionCompleted = async (transaction: any) => {
  // A) Si el Cálculo dice OK
  if (isApproved(transaction.status)) {
    // B) Encadenamos las Acciones
    await sendNotification(transaction.userId);
    await updateStats(transaction.amount);
  }
};

/**
 * 🧠 LECCIÓN:
 * Las Acciones son difíciles de testear, así que las encadenamos
 * en funciones de orquestación (Handlers) lo más simples posibles.
 * 
 * Mantén la lógica de "SÍ/NO" en Cálculos (isApproved) y el
 * "HACER ESTO" en Acciones (sendNotification).
 */
