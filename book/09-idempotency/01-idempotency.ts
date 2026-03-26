/**
 * IDEMPOTENCIA (Idempotency)
 * En el libro, las Acciones son peligrosas porque dependen de cuántas veces se ejecutan.
 * La idempotencia es el arte de hacer que una Acción se comporte como un Cálculo:
 * "No importa cuántas veces la ejecutes, el resultado final es el mismo".
 */

// 1. EL PROBLEMA: Acción no idempotente
let balance = 0;
const addMoneyAction = (amount: number) => {
  balance += amount; // Si se llama 2 veces por error, el saldo está mal.
};

// 2. LA SOLUCIÓN: Usar un ID de transacción (Idempotency Key)
const processedTransactions = new Set<string>();

export const depositIdempotentAction = async (
  transactionId: string, 
  amount: number,
  saveToDb: (amt: number) => Promise<void>
) => {
  // A) Verificamos si ya se procesó (Capa de Control)
  if (processedTransactions.has(transactionId)) {
    console.log("Transacción ya procesada, ignorando...");
    return; 
  }

  // B) Ejecutamos la acción
  await saveToDb(amount);
  
  // C) Marcamos como procesada
  processedTransactions.add(transactionId);
};

/**
 * 🧠 LECCIÓN:
 * En sistemas distribuidos (como AWS/Microservicios), las redes fallan.
 * Los mensajes se envían dos veces. 
 * Si tus Acciones (como crear transacciones) son IDEMPOTENTES, tu sistema
 * es SÓLIDO COMO UNA ROCA.
 * 
 * Estrategias de Grokking Simplicity:
 * 1. Identificar si una acción es "safe" o "unsafe".
 * 2. Envolver acciones "unsafe" en lógica de control de duplicados.
 */
