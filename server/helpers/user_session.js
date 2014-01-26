var user_session = function() {

    /**
     * Creates a new user session.
     * @constructor
     */
    var UserSession = function() {
        this.score = 0;
    };

    return {
        /**
         * Returns the user session.
         * @returns {UserSession}
         */
        get: function(req) {
            if (!req.session.user) {
                req.session.user = new UserSession();
            }
            return req.session.user;
        },
        /**
         * Clears the user session.
         */
        clear: function(req) {
            delete req.session.user;
        }
    };
};

module.exports = user_session;