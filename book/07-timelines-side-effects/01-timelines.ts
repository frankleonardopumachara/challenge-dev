/**
 * GESTIÓN DE TIMELINES (Concurrency & Race Conditions)
 * El libro dedica mucho tiempo a cómo las Acciones pueden fallar si se ejecutan 
 * en desorden o al mismo tiempo.
 */

// 1. EL PROBLEMA: Race Conditions
// Imagina actualizar un balance leyendo y guardando.
// Si dos peticiones llegan a la vez, una podría pisar a la otra.
let globalBalance = 100;

const updateBalanceAsync = async (amount: number) => {
  const current = globalBalance; // Lectura
  await new Promise(r => setTimeout(r, 10)); // Simulación de DB lenta
  globalBalance = current + amount; // Escritura (Peligroso)
};

// 2. LA SOLUCIÓN (Queue / Serialización)
// El libro propone "Serializar las Acciones" o usar primitivas de concurrencia.
class ActionQueue {
  private queue: Promise<any> = Promise.resolve();

  add(action: () => Promise<any>) {
    // Encadenamos la nueva acción al final de la anterior.
    this.queue = this.queue.then(() => action());
    return this.queue;
  }
}

const secureQueue = new ActionQueue();

// Ahora, aunque llamemos 10 veces a la vez, se ejecutan en ORDEN.
export const safeUpdate = (amount: number) => {
  return secureQueue.add(() => updateBalanceAsync(amount));
};

/**
 * 🧠 LECCIÓN:
 * "Grokking Simplicity" enseña que las ACCIONES tienen una dimensión temporal (Timelines).
 * Debemos identificar:
 * 1. Qué acciones pueden ejecutarse en paralelo (Independientes).
 * 2. Qué acciones DEBEN ejecutarse en orden (Secuenciales).
 * 3. Qué acciones NO deben ejecutarse a la vez sobre el mismo recurso (Mutuamente excluyentes).
 */
