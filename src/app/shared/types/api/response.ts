export interface ApiError {
  code: string;
  message: string;
}

export interface ApiMetadata {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

export interface ApiResponse<T> {
  status: "success" | "error";
  data?: T;
  message?: string;
  errors?: ApiError[];
  metadata?: ApiMetadata;
}
