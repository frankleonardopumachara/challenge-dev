/**
 * ABSTRACCIÓN SOBRE PATRONES (Higher-Order Functions)
 * En el libro se explica cómo "sacar" la lógica repetitiva a funciones.
 */

// 1. EL PROBLEMA: Lógica repetitiva envuelta en try/catch o logs.
// Si tenemos 10 funciones que necesitan loguear errores, terminamos con mucho ruido.

// 2. LA SOLUCIÓN FUNCIONAL: Un "High-Order Function" que envuelve una acción.
export const withLogging = (action: Function) => {
  return async (...args: any[]) => {
    try {
      console.log(`Ejecutando con argumentos:`, args);
      const result = await action(...args);
      console.log(`Éxito!`);
      return result;
    } catch (error) {
      console.error(`Error detectado:`, error);
      throw error;
    }
  };
};

// 3. APLICACIÓN AL DOMINIO (Ejemplo de Transacciones)
const saveToDb = async (data: any) => {
  // Simulación de guardado
  if (data.amount < 0) throw new Error('Monto negativo');
  return { id: '123', ...data };
};

// Creamos una nueva versión de la función que YA TIENE LOGS
export const safeSaveToDb = withLogging(saveToDb);

/**
 * 🧠 LECCIÓN:
 * Las HOF nos permiten separar REGLAS DE INFRAESTRUCTURA (logs, transacciones DB, retries)
 * de la LÓGICA DE NEGOCIO pura.
 * 
 * En el libro, esto se llama "Refactoring to Higher-Order Functions".
 */
