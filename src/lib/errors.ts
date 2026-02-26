/**
 * Códigos de error del sistema Kairos
 * Estos códigos vienen del backend/n8n
 */
export enum ErrorCode {
  REUNION_DUPLICADA = 'REUNION_DUPLICADA',
  ERROR_DESCONOCIDO = 'ERROR_DESCONOCIDO',
  TOKEN_NO_VALIDO = 'TOKEN_NO_VALIDO',
  ERROR_INPUT = 'ERROR_INPUT',
  SIN_DISPONIBILIDAD = 'SIN_DISPONIBILIDAD',
  CITA_YA_CONFIRMADA = 'CITA_YA_CONFIRMADA',
}

/**
 * Mensajes de error para el cliente
 */
export const ErrorMessages: Record<ErrorCode, string> = {
  [ErrorCode.REUNION_DUPLICADA]:
    'Ya existe una reunión agendada para este horario. Por favor selecciona otra fecha u hora.',
  [ErrorCode.ERROR_DESCONOCIDO]:
    'Ocurrió un error inesperado. Por favor intenta de nuevo más tarde o contacta soporte.',
  [ErrorCode.TOKEN_NO_VALIDO]:
    'Tu sesión ha expirado. Por favor recarga la página e intenta nuevamente.',
  [ErrorCode.ERROR_INPUT]:
    'Los datos proporcionados no son válidos. Por favor verifica la información e intenta de nuevo.',
  [ErrorCode.SIN_DISPONIBILIDAD]:
    'No hay horarios disponibles para la fecha seleccionada. Por favor elige otra fecha.',
  [ErrorCode.CITA_YA_CONFIRMADA]:
    'Esta cita ya fue confirmada anteriormente y no puede ser modificada.',
};

/**
 * Obtiene el mensaje de error para el cliente según el código
 * Retorna undefined cuando no hay error (codeMessage es "ok", undefined, o vacío)
 */
export function getErrorMessage(codeMessage?: string): string | undefined {
  // Si no hay código o es "ok", no hay error
  if (!codeMessage || codeMessage === 'ok' || codeMessage === '') {
    return undefined;
  }
  
  // Si es un código de error conocido, retornar el mensaje
  if (Object.values(ErrorCode).includes(codeMessage as ErrorCode)) {
    return ErrorMessages[codeMessage as ErrorCode];
  }
  
  // Código no reconocido, retornar genérico
  return ErrorMessages[ErrorCode.ERROR_DESCONOCIDO];
}
