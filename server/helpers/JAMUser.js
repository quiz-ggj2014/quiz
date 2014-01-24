var JAMUser = (function() {
    function JAMUser() {
        this.score = 0;
    }
    
    return JAMUser;
})();

var user = function(req) {
    if ( typeof( req.session.user ) == "undefined" ) {
        req.session.user = new JAMUser();
    }
    
    return req.session.user;
}

module.exports = user;