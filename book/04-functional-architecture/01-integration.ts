/**
 * ARQUITECTURA FUNCIONAL EN EL MUNDO REAL
 * Este es un resumen de cómo se integra todo en una aplicación real.
 */

// 1. REGLAS (Cálculos en Application)
// Puras, sin base de datos, 100% testeables.
export const validateTransaction = (amount: number) => amount > 0;
export const calculateIgv = (amount: number) => amount * 0.18;

// 2. CASOS DE USO (Acciones en Application)
// Aquí es donde orquestamos.
// Recibimos datos -> Aplicamos reglas -> Guardamos.
export class CreateTransactionUseCase {
  constructor(private readonly repository: any) {}

  async execute(data: any) {
    // A) Aplicamos Reglas (Cálculos)
    if (!validateTransaction(data.amount)) throw new Error('Invalid');
    const igv = calculateIgv(data.amount);

    // B) Ejecutamos Acción (Side-Effect)
    return this.repository.save({ ...data, igv });
  }
}

/**
 * 🧠 LECCIÓN FINAL:
 * La Arquitectura Funcional no se trata de usar 'map' y 'filter' por todos lados.
 * Se trata de TRABAR EL NEGOCIO EN FUNCIONES PURAS (Cálculos)
 * y dejar los efectos secundarios (Acciones) para la infraestructura.
 * 
 * ¡FELICIDADES! Acabas de aprender las bases de "Grokking Simplicity".
 */
