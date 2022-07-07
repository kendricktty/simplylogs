const authError = async (err, req, res, next) => {
    if (err.status !== 401 && err.status !== 403) {
        return next(err);
    }

    res.json({
        msg: err.message
    });
}

module.exports = authError;