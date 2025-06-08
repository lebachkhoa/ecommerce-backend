const statusCode = {
    OK: 200,
    CREATED: 201
}

const ReasonStatusCode = {
    OK: "Success",
    CREATED: "Created"
}


class SuccessResponse {
    constructor({ message, status, metadata }) {
        this.message = message;
        this.status = status;
        this.metadata = metadata;
    }

    send(res) {
        return res.status(this.status).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({ message = ReasonStatusCode.OK, status = statusCode.OK, metadata }) {
        super({ message, status, metadata });
    }
}

class CREATED extends SuccessResponse {
    constructor({ message = ReasonStatusCode.CREATED, status = statusCode.CREATED, metadata }) {
        super({ message, status, metadata });
    }
}

module.exports = { OK, CREATED }