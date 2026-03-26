/**
 * REFACTORIZACIÓN AVANZADA
 * De un "Handler sucio" (solo Acciones) a una "Arquitectura Funcional" (Cálculos + Datos).
 */

// --- ANTES (Todo mezclado) ---
/*
async function handle(req, res) {
  const user = await db.findUser(req.userId); // ACCIÓN
  const total = req.items.reduce((a, b) => a + b, 0); // CÁLCULO mezclado
  if (total > user.balance) { // LÓGICA mezclada
    await db.logError('Insuficiente'); // ACCIÓN
    return res.status(400).send();
  }
  await db.saveTransaction(total); // ACCIÓN
  res.send({ ok: true });
}
*/

// --- DESPUÉS (Refactorizado estilo Normand) ---

// 1. EL CÁLCULO (El cerebro del negocio)
// Extraemos la lógica a una función pura.
export const canAfford = (balance: number, total: number): boolean => {
  return balance >= total;
};

// 2. EL DATO (El contrato)
export interface OrderResult {
  success: boolean;
  message?: string;
  total: number;
}

// 3. LA ACCIÓN (El orquestador mínimo)
export const processOrder = async (
  userId: string,
  items: number[],
  db: { getUserBalance: (id: string) => Promise<number>, save: (amt: number) => Promise<void> }
): Promise<OrderResult> => {
  // A) Paso de Datos: Obtener información (ACCIÓN)
  const balance = await db.getUserBalance(userId);
  const total = items.reduce((a, b) => a + b, 0); // Cálculo simple in-situ

  // B) Paso de Lógica: Aplicar regla (CÁLCULO)
  if (!canAfford(balance, total)) {
    return { success: false, message: 'Balance insuficiente', total };
  }

  // C) Paso de Efecto: Guardar (ACCIÓN)
  await db.save(total);
  return { success: true, total };
};

/**
 * 🧠 LECCIÓN:
 * Refactorizar es el proceso de IDENTIFICAR cálculos 
 * dentro de tus acciones y EXTRAERLOS.
 * El resultado es un código más corto, más limpio y 100% testeable.
 */
