/**
 * Códigos de error del sistema Kairos
 * Estos códigos vienen del backend/n8n y se usan para manejar errores específicos
 */
export enum ErrorCode {
  /** La reunión ya existe duplicada */
  REUNION_DUPLICADA = 'REUNION_DUPLICADA',
  /** Error genérico no controlado */
  ERROR_DESCONOCIDO = 'ERROR_DESCONOCIDO',
  /** Token de autenticación inválido */
  TOKEN_NO_VALIDO = 'TOKEN_NO_VALIDO',
  /** Datos mal formateados o tipos incorrectos */
  ERROR_INPUT = 'ERROR_INPUT',
  /** No hay disponibilidad de reuniones */
  SIN_DISPONIBILIDAD = 'SIN_DISPONIBILIDAD',
  /** La cita ya fue confirmada, no se puede actualizar */
  CITA_YA_CONFIRMADA = 'CITA_YA_CONFIRMADA',
}

/**
 * Mensajes de error para el cliente
 * Traduce los códigos técnicos a mensajes amigables
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
 * Tipo de respuesta de error del servidor
 */
export interface ServerError {
  codeMessage?: ErrorCode;
  message?: string;
  error?: string;
}

/**
 * Tipo de respuesta exitosa del servidor
 */
export interface ServerSuccess<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

/**
 * Tipo de respuesta genérica del servidor
 */
export type ServerResponse<T = unknown> = ServerSuccess<T> | ServerError;

/**
 * Verifica si la respuesta del servidor es un error
 */
export function isServerError(response: unknown): response is ServerError {
  if (typeof response !== 'object' || response === null) return false;
  const obj = response as Record<string, unknown>;
  return typeof obj.codeMessage === 'string' && Object.values(ErrorCode).includes(obj.codeMessage as ErrorCode);
}

/**
 * Obtiene el mensaje de error para el cliente
 * Si el servidor devuelve un código conocido, usa el mensaje predefined
 * De lo contrario, usa el mensaje genérico o el mensaje del servidor
 */
export function getClientErrorMessage(error: ServerError): string {
  const code = error.codeMessage;

  if (code && Object.values(ErrorCode).includes(code)) {
    return ErrorMessages[code];
  }

  // Fallback al mensaje del servidor o genérico
  return error.message || ErrorMessages[ErrorCode.ERROR_DESCONOCIDO];
}

/**
 * Crea un objeto de error para respuestas fallidas
 */
export function createErrorResponse(code: ErrorCode, message?: string): ServerError {
  return {
    codeMessage: code,
    message: message || ErrorMessages[code],
  };
}
