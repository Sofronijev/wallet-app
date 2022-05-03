const jwt = require('jsonwebtoken');
const config = require('../config/config');

//queryResult je result koji se vraca kad se odradi procedura koja izvlaci korisnika iz baze
exports.createAccessToken = (queryResult) => {
    return jwt.sign(
        {
            userData: {
                id: queryResult.id,
                name: queryResult.name,
                email: queryResult.email
            }
        },
        config.jwt_token,
        {
            expiresIn: '4h'
        }
    );
};

exports.createRefreshToken = (queryResult) => {
    return jwt.sign(
        {
            userData: {
                id: queryResult.id,
                name: queryResult.name,
                email: queryResult.email
            }
        },
        config.jwt_refresh,
        {
            expiresIn: '30d'
        }
    );
};

// TODO add token validation
// You should validate the token in your server-side logic by using something like express-jwt, koa-jwt, Owin Bearer JWT, etc.
// https://www.npmjs.com/package/jwt-decode