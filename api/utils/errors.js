// // Internal error
// class InternalError extends Error {
//   constructor(message = 'Internal Server Error', statusCode = 500) {
//     super(message);
//
//     Error.captureStackTrace(this, this.constructor);
//
//     this.name = this.constructor.name;
//     this.statusCode = statusCode;
//   }
// }
//
// exports.InternalError = InternalError;
//
// // Client error
// class ClientError extends InternalError {
//   constructor(message = 'Client Error', statusCode = 400) {
//     if (statusCode < 400 || statusCode > 499)
//       throw new InternalError('invalid.statusCode');
//
//     super(message, statusCode);
//   }
// }
//
// exports.ClientError = ClientError;
//
// // Not found error error
// class NotFoundError extends InternalError {
//   constructor(message = 'Not Found', statusCode = 404) {
//     super(message, statusCode);
//   }
// }
//
// exports.NotFoundError = NotFoundError;
//
// // Validation error
// class ValidationError extends InternalError {
//   constructor(message = 'Validation Error', statusCode = 422) {
//     super(message, statusCode);
//   }
// }
//
// exports.ValidationError = ValidationError;
