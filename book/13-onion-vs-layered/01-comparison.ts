/**
 * ARQUITECTURA CEBOLLA VS TRADICIONAL
 * Por qué la arquitectura funcional empuja las capas hacia afuera.
 */

// --- ENFOQUE TRADICIONAL (LAS ACCIONES ESTÁN EN EL CENTRO) ---
// Controller -> Service -> Repository -> Database
// El Service es una "Acción" que depende de otra "Acción" (Repo).
// TODO es difícil de testear porque el efecto secundario está en el núcleo.

// --- ENFOQUE CEBOLLA FUNCIONAL (EL CÁLCULO ESTÁ EN EL CENTRO) ---

// 1. EL NÚCLEO: Cálculos Puros (Sin dependencias)
export const calculateRewardPoints = (amount: number, userLevel: string): number => {
  const multiplier = userLevel === 'VIP' ? 0.1 : 0.05;
  return amount * multiplier;
};

// 2. LA CAPA DE ADAPTACIÓN (Interpreta los Datos)
export const prepareTransactionRecord = (data: any, points: number) => ({
  ...data,
  pointsEarned: points,
  processedAt: new Date().toISOString()
});

// 3. LA CAPA EXTERNA: Acciones (Donde ocurre el mundo real)
// Aquí es donde "inyectamos" la impureza.
export const processOrder = async (
  orderData: any,
  userLevel: string,
  saveAction: (record: any) => Promise<void>
) => {
  // A) Cálculo puro (Cerebro)
  const points = calculateRewardPoints(orderData.amount, userLevel);
  
  // B) Transformación de datos (Cerebro)
  const record = prepareTransactionRecord(orderData, points);
  
  // C) Ejecución de la acción (Músculo)
  return await saveAction(record);
};

/**
 * 🧠 LECCIÓN:
 * En la arquitectura tradicional, el Service es el jefe.
 * En la funcional, los DATOS y los CÁLCULOS son los jefes.
 * Las acciones son solo "mensajeros" que llevan los datos al mundo exterior.
 */
