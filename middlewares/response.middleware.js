const responseMiddleware = (req, res, next) => {
    if (!res.err) {
        res.status(200).json(res.data)
    } else {
        res.json({
            error: true,
            message: res.err.message
        })
    }
    next();
}

exports.responseMiddleware = responseMiddleware;