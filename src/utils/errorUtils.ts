
export function getStatusCodeForErrorCode(errorCode: string): number {
    switch (errorCode) {
        case 'DuplicateNameError':
          return 409; // Conflict
        case 'NotFound':
          return 404; // Not Found
        case 'UnknownError':
          return 500; // Internal Server Error
        case 'ValidationError':
          return 422; // Unprocessable Entity
        case 'DuplicateError':
          return 409; // Conflict
        case 'InputParameterError':
          return 400; // Bad Request
        case 'BadRequest':
          return 400; // Bad Request
        case 'Unauthorized':
          return 401; // Unauthorized
        case 'InternalServerError':
          return 500; // Internal Server Error
        default:
          return 500; // Fallback untuk kode kesalahan yang tidak dikenali
      }
  }
  