const { fighter } = require('../models/fighter');

const createFighterValid = (req, res, next) => {
    let message = ''

    if(!Object.keys(req.body).length) {
        message = 'nothing entered; '
    }

    for(let key in req.body) {
        if(!(key in fighter) || key === 'id') {
            message += `${key} is not available key; `
        }
    }

    for(let key in fighter) {
        if(key !== 'id' && key !== 'health' && !req.body[key]) {
            message += `${key} is required; `
        }
    }

    if(req.body.power && !(req.body.power >= 1 && req.body.power <= 100)) {
        message += 'power must be between 1 and 100; '
    }

    if(req.body.defense && !(req.body.defense >= 1 && req.body.defense <= 10)) {
        message += 'defense must be between 1 and 10; '
    }

    if(req.body.health && !(req.body.health >= 80 && req.body.health <= 120)) {
        message += 'health must be between 80 and 120; '
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

const updateFighterValid = (req, res, next) => {
    let message = ''

    if(!Object.keys(req.body).length) {
        message = 'nothing to update; '
    }

    for(let key in req.body) {
        if(!(key in fighter) || key === 'id') {
            message += `${key} is not available key; `
        }
    }

    if(req.body.power && !(req.body.power >= 1 && req.body.power <= 100)) {
        message += 'power must be between 1 and 100; '
    }

    if(req.body.defense && !(req.body.defense >= 1 && req.body.defense <= 10)) {
        message += 'defense must be between 1 and 10; '
    }

    if(req.body.health && !(req.body.health >= 80 && req.body.health <= 120)) {
        message += 'health must be between 80 and 120; '
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

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;