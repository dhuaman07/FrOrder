export interface ApiResponse<T = any> {
  isSuccess: boolean;  // ← Cambiado de "success" a "isSuccess"
  message: string;
  data?: T;
  errors?: string[];
}

/**
 * Respuesta paginada
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Error de API
 */
export interface ApiError {
  code: string;
  message: string;
  field?: string;
  statusCode?: number;
}

/**
 * Metadatos de paginación
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Filtros genéricos
 */
export interface FilterParams {
  search?: string;
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
  [key: string]: any;
}