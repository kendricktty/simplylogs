const errorHandler = async (err, req, res, next) => {
    if (err.status === 404) {
        console.log(err.status);
        console.log(err.message);
        return res.json({
            status: err.status,
            msg: err.msg
        });
    }
    next(err);
}

module.exports = errorHandler;