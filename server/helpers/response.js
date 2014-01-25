/**
 * Response wrapprer.
 * @param {JAMUser} user        The current user
 * @param {Object}  response    Response object
 **/

module.exports = (function() {
    function Response(data) {
        this.success = true;
        if( typeof(data) != "undefined" ) this.data = data;
    }
    
    return Response;
})();