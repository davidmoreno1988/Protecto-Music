const jwt = require("jwt-simple");
const moment = require("moment");
const secret = "clave secreta";

exports.userToken = function(user){
    let payload = {
        sub:user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        image:user.image,
        role:user.role,
        email:user.email,
        iat:moment().unix(),
        exp:moment().add(30,"days"),
    }
    return jwt.encode(payload, secret);
}
