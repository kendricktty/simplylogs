const notFound = async (err, req, res, next) => {
    if (err.status === 404) {
        console.log(err.status);
        return res.status(err.status).json({
            msg: err.message
        });
    }
    next(err);
}

module.exports = notFound;