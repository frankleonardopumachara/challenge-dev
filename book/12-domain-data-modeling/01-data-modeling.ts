/**
 * MODELADO DE DOMINIO ORIENTADO A DATOS (Data-Driven Domain Modeling)
 * El libro defiende que los datos (Data) son mejores que los objetos (Objects).
 * "Data should stay data".
 */

// 1. ENFOQUE OBJETOS (OOP - A veces complejo)
class Transaction {
  constructor(private amount: number) {}
  getIgv() { return this.amount * 0.18; }
}
// El dato está "atrapado" en la clase.

// 2. ENFOQUE DATOS (Grokking Simplicity)
type TransactionData = {
  id: string;
  amount: number;
};
// El dato es transparente. Cualquier función puede usarlo.

// 3. TRANSFORMACIÓN DE DATOS (El corazón del dominio)
const calculateIgv = (t: TransactionData) => t.amount * 0.18;
const createApprovedVersion = (t: TransactionData) => ({
  ...t,
  status: 'APPROVED'
});

/**
 * 🧠 LECCIÓN:
 * Los Datos son INERTES. No "hacen" nada. 
 * Son fáciles de:
 * - Guardar en un JSON.
 * - Enviar por la red.
 * - Comparar con otros datos.
 * 
 * En el libro, modelar el dominio es definir la ESTRUCTURA de tus DATOS 
 * y las FUNCIONES PURAS que los transforman.
 * 
 * "Haz que tus datos sean tan simples que no necesiten documentación".
 */
