/**
 * Response wrapprer.
 * @param {JAMUser} user        The current user
 * @param {Object}  response    Response object
 **/

module.exports = (function() {
    function Response(user, results) {
        this.user = user;
        if( typeof(results) != "undefined" ) this.results = results;
    }
    
    return Response;
})();