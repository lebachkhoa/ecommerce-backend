// create new class that inherits from build-in JS Error class.
// this class has two properties: message, status
// the message property is inherited from Error class

const statusCode = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409
}

const ReasonStatusCode = {
    BAD_REQUEST: "Bad request",
    UNAUTHORIZED: "unauthorized",
    FORBIDDEN: "No permission",
    NOT_FOUND: "Not found",
    CONFLICT: "Conflict"
}

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);             // inherit message property form Build-in Error class
        this.status = status;       // define new property status
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.BAD_REQUEST, status = statusCode.BAD_REQUEST) {
        super(message, status);
    }
}

class UnAuthorizedRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.UNAUTHORIZED, status = statusCode.UNAUTHORIZED) {
        super(message, status);
    }
}

class ForbiddenRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.FORBIDDEN, status = statusCode.FORBIDDEN) {
        super(message, status);
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFLICT, status = statusCode.CONFLICT) {
        super(message, status);
    }
}

class NotFoundRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.NOT_FOUND, status = statusCode.NOT_FOUND) {
        super(message, status);
    }
}

module.exports = {
    BadRequestError,
    UnAuthorizedRequestError,
    ForbiddenRequestError,
    ConflictRequestError,
    NotFoundRequestError
}