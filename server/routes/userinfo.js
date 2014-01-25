var user     = require('../helpers/JAMUser.js');
    
    
/**
 * Answer route.
 * @param {Object} params
 * @returns {Object}
 */
var userinfo = function() {

    return {
        /**
         *
         * @param req
         * @param res
         */
        get: function(req, res) {
            
            var currUser = user(req); // Current user
            
            // TODO: Do this as own object
            var standardizedRequest = {
                user: currUser
            }
            
            
            res.send( standardizedRequest );
            
        }
    }
};

module.exports = userinfo;