const jwt = require('jsonwebtoken');
const config = require('../config/config');

//queryResult je result koji se vraca kad se odradi procedura koja izvlaci korisnika iz baze
exports.createAccessToken = (queryResult) => {
    return jwt.sign(
        {
            userData: {
                id: queryResult.id,
                name: queryResult.name,
                surname: queryResult.surname,
                username: queryResult.username,
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
                username: queryResult.username,
            }
        },
        config.jwt_refresh,
        {
            expiresIn: '30d'
        }
    );
};