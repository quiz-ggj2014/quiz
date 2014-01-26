var user_session = require('../helpers/user_session.js')(),
    Response = require('../helpers/response.js');

/**
 * Player route.
 * @returns {Object}
 */
var player = function() {

    return {
        /**
         * Returns the current player session.
         * @param req
         * @param res
         */
        getPlayer: function(req, res) {
            res.send({user: user_session.get(req)});
        },
        /**
         * Clears the current player session.
         * @param req
         * @param res
         */
        clearPlayer: function(req, res) {
            user_session.clear(req);
            var response = new Response();
            res.send(response.success());
        }
    }
};

module.exports = player;