const getOrdersFromPastNMonths = async (req, res, next) => {
    const since = req.query.since;
    const upper = new Date();
    const lower = new Date();
    lower.setMonth(upper.getMonth() - since);
    console.log(`Upper: ${upper}; Lower: ${lower}`);
    res.status(400).send();
}

module.exports = getOrdersFromPastNMonths;