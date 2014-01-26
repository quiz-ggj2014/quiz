var Response = function(data) {
    this.data = data || {};
};

/**
 * Adds a value to the response data.
 * @param {String} key
 * @param {*} value
 */
Response.prototype.add = function(key, value) {
    this.data[key] = value;
};

/**
 * Outputs a successful response.
 * @param {Object} data
 * @returns {{success: boolean, data: Object}}
 */
Response.prototype.success = function(data) {
    if (data) {
        this.data = data;
    }
    return {
        success: true,
        data: this.data
    }
};

/**
 * Outputs an error response.
 * @param {string} msg
 * @returns {{error: boolean, message: String}}
 */
Response.prototype.error = function(msg) {
    return {
        error: true,
        message: msg
    }
};

module.exports = Response;