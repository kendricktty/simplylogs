const errorHandler = async (err, req, res, next) => {
    if (err.status === 404) {
        console.log(err.status);
        return res.json({
            msg: err.message
        });
    }
    next(err);
}

module.exports = errorHandler;