module.exports.checkRequest = function (obj, numberOfParameter, callback) {
    let isValide = true;
    if (Object.keys(obj).length < numberOfParameter) {
        isValide =  false;
    }
    callback(isValide);
}

module.exports.createSession = function (uid, password, callback) {
    let signInDateUTC = new Date();
    signInDateUTC.setHours(signInDateUTC.getHours() + 3);
    console.log(signInDateUTC);
    let session = {
        'uid': uid,
        'password': password,
        'is_valide': true,
        'sing_in_at': signInDateUTC,
        'log_out_at': null
    };
    callback(session);
}

module.exports.destroySession = function (session, callback) {
    let logOutDateUTC = new Date();
    logOutDateUTC.setHours(signInDateUTC.getHours() + 3);
    session.is_valide = false;
    session.log_out_at = logOutDateUTC;
    callback(session);
}

module.exports.verifieSession = function (session) {
    return session.is_valide;
}