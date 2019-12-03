// Success (2xx)
export const OK = 200
export const CREATED = 201 // something was created
export const ACCEPTED = 202 // looks good, still processing

// Client Errors (4xx)
export const BAD_REQUEST = 400 // malformed request, invalid JSON body for example, or too large, etc
export const UNAUTHENTICATED = 401 // Unauthenticated - Used is not logged in but needs to be, client response should include Authorization
export const FORBIDDEN = 403 // Forbidden - User is logged in, but is not authorized to access requested thing
export const NOT_FOUND = 404 // Whatever is being requested was not found
export const UNPROCESSABLE_ENTITY = 422
export const SESSION_TIMEOUT = 440 // User was logged in, but session expired and needs to reauthenticate

// Server Errors (5xx)
export const INTERNAL_SERVER_ERROR = 500
export const NOT_IMPLMENTED = 501
export const BAD_GATEWAY = 502
export const GATEWAY_TIMEOUT = 504
