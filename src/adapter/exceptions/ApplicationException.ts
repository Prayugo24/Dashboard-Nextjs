import { getStatusCodeForErrorCode } from "@/utils/errorUtils";

export type ErrorCodes =
  | 'DuplicateNameError'
  | 'NotFound'
  | 'UnknownError'
  | 'ValidationError'
  | 'DuplicateError'
  | 'InputParameterError'
  | 'BadRequest'
  | 'Unauthorized'
  | 'InternalServerError';

export class ApplicationException<T> extends Error {
  name: string;
  status: ErrorCodes;
  errorCode: number;
  errors?: T;
  stack?: string | undefined;
  constructor(message: string ,errorCode: ErrorCodes, errors?: T) {
    const status = getStatusCodeForErrorCode(errorCode);
    super(message);
    this.name = message;
    this.status = errorCode
    this.errorCode = status;
    this.errors = errors;
  }
}