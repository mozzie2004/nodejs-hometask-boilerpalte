const { user } = require('../models/user');
const createUserValid = (req, res, next) => {
    let message = ''

    if(!Object.keys(req.body).length) {
        message = 'nothing entered; '
    }

    for(let key in req.body) {
        if(!(key in user) || key === 'id') {
            message += `${key} is not available key; `
        }
    }

    for(let key in user) {
        if(key !== 'id' && !req.body[key]) {
            message += `${key} is required; `
        }
    }

    if(req.body.email && !req.body.email.trim().match(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/)) {
        message += 'incorrect email; '
    }

    if (req.body.email && !req.body.email.match(/@gmail/)) {
        message += 'email - must be @gmail; '
    }

    if (req.body.phoneNumber && !req.body.phoneNumber.match(/^\+380\d{9}$/)) {
        message += 'incorect phone; '
    }

    if (req.body.password && req.body.password.length < 3) {
        message += 'password is too short, min 3 symbols; '
    }

    if(message) {
        res.status(400).json({
            error: true,
            message
        })
        return
    }
    next()
}

const updateUserValid = (req, res, next) => {
    let message = ''

    if(!Object.keys(req.body).length) {
        message = 'nothing to update; '
    }

    for(let key in req.body) {
        if(!(key in user) || key === 'id') {
            message += `${key} is not available key; `
        }
    }

    if(req.body.email && !req.body.email.trim().match(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/)) {
        message += 'incorrect email; '
    }

    if (req.body.email && !req.body.email.match(/@gmail/)) {
        message += 'email - must be only @gmail; '
    }

    if (req.body.phoneNumber && !req.body.phoneNumber.match(/^\+380\d{9}$/)) {
        message += 'incorect phone; '
    }

    if (req.body.password && req.body.password.length < 3) {
        message += 'password to short, min 3 symbols; '
    }

    if(message) {
        res.status(400).json({
            error: true,
            message
        })
        return
    }
    next()
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;