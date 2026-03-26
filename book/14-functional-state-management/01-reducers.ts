/**
 * GESTIÓN DE ESTADO FUNCIONAL
 * Cómo manejar cambios de estado sin mutaciones, usando Reductores (Reducers).
 */

// 1. EL DATO (Inmutable)
export interface TransactionState {
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  attempts: number;
}

// 2. EL CÁLCULO (Transformación del estado)
// No modificamos el objeto original, devolvemos uno NUEVO.
export const transitionTo = (
  state: TransactionState, 
  newStatus: TransactionState['status']
): TransactionState => {
  // Regla de negocio: No se puede cambiar de APPROVED a REJECTED
  if (state.status === 'APPROVED' && newStatus === 'REJECTED') {
    return state; // Devuelve el mismo estado, no cambia nada
  }

  return {
    ...state,
    status: newStatus,
    attempts: state.attempts + 1
  };
};

// 3. LA ACCIÓN (Sincronización con el mundo real)
export const updateTransactionInDB = async (
  id: string, 
  currentState: TransactionState,
  newStatus: TransactionState['status'],
  saveToDB: (id: string, state: TransactionState) => Promise<void>
) => {
  // A) Calculamos el siguiente estado (PURO)
  const nextState = transitionTo(currentState, newStatus);
  
  // B) Si el estado no cambió, no hacemos nada (Optimización)
  if (nextState === currentState) return;

  // C) Persistimos el nuevo estado (ACCIÓN)
  await saveToDB(id, nextState);
};

/**
 * 🧠 LECCIÓN:
 * Al manejar el estado como DATOS y los cambios como CÁLCULOS, 
 * puedes probar toda tu máquina de estados sin una base de datos.
 * "El estado es solo un valor en el tiempo".
 */
