const validationError = async (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        err.status = 400
        console.log(err.status);
        console.log(err.message);
        return res.status(err.status).json({
            msg: err.message
        });
    }
    next(err);
}

module.exports = validationError;