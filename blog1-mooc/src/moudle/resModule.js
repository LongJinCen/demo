class BaseModle {
    constructor(data, message) {
        if(typeof data === 'string') {
            this.message = data
            data = null
            message = null
        }
        if(data) {
            this.data = data
        }
        if(message) {
            this.message = message
        }
    }
}

class SuccessModule extends BaseModle {
    constructor(data, message) {
        super(data, message)
        this.errno = 0
    }
}

class ErrorModule extends BaseModle {
    constructor(data, message) {
        super(data, message)
        this.errno = -1
    }
}

module.exports = {
    SuccessModule,
    ErrorModule
}