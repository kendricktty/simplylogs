const Order = require('../model/order')
const { BadRequestError } = require('../errors')

const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

function getTotal(orders) {
    let total = 0
    for (let index = 0; index < orders.length; index++) {
        total += orders[index].grossTotal;
    }
    return total
}

const getAllOrders = async (req, res) => {
    const { period, get12MonthsData } = req.query
    const queryObject = {}
    queryObject.company = req.user.company

    const today = new Date().toLocaleDateString('en-GB', { timeZone: 'Singapore' })

    const dateArr = today.split('/')

    const sgtISOString = dateArr[2] + "-" + dateArr[1] + "-" + dateArr[0] + "T00:00:00.000+08:00"
    const startOfDay = new Date(sgtISOString)

    const sgtStartOfMonthISO = dateArr[2] + "-" + dateArr[1] + "-" + "01T00:00:00.000+08:00"
    const startOfMonth = new Date(sgtStartOfMonthISO)
    const day = new Date().getDay()

    if(period === 'daily') {
        queryObject.createdAt = { $gte: startOfDay.toISOString()}
    }

    if(period === 'weekly') {
        // console.log(startOfDay.toISOString())
        // console.log(new Date(startOfDay.getTime() - (day - 1) * 86400000).toISOString());
        queryObject.createdAt = { $gte: new Date(startOfDay.getTime() - (day - 1) * 86400000).toISOString()}
    }

    if(period === 'month') {
        queryObject.createdAt = { $gte: startOfMonth.toISOString()}
    }

    //substract month function
    function subtractMonths(numOfMonths, date) {
        date.setMonth(date.getMonth() - numOfMonths);
        return date;
    }

    //add month function
    function addMonths(numOfMonths, date) {
        const tempDate = date
        tempDate.setMonth(date.getMonth() + numOfMonths);
        return tempDate;
    }



    const monthlyRevenue = []
    if(get12MonthsData) {

        let StartMonth = startOfMonth

        const EndMonth = addMonths(1, new Date(StartMonth.toISOString()))

        const orders = await Order.find({createdAt : {$gte:StartMonth.toISOString(), $lt:EndMonth.toISOString()}, company: req.user.company})

        const dataObject = { name:month[StartMonth.getMonth()], "Revenue": getTotal(orders)}

        monthlyRevenue.push(dataObject)

        for (let index = 1; index < 12; index++) {
            
            StartMonth = subtractMonths(1,StartMonth)
            
            const EndMonth = addMonths(1, new Date(StartMonth.toISOString()))

            const orders = await Order.find({createdAt : {$gte:StartMonth.toISOString(), $lt:EndMonth.toISOString()}, company: req.user.company})

            const dataObject = { name:month[StartMonth.getMonth()], "Revenue": getTotal(orders)}

            monthlyRevenue.push(dataObject)
        }
    }


    const orders = await Order.find(queryObject)


    
    res.status(200).json({ orders, orderCount: orders.length, revenue: getTotal(orders),monthlyRevenue })
}

const createOrder = async (req, res) => {

    req.body.createdBy = req.user.userId
    req.body.company = req.user.company
    const order = await Order.create(req.body)
    const sufficientQty = await order.validateQuantity()
    if (!sufficientQty) {
        await Order.findOneAndDelete({ _id: order._id })
        throw new BadRequestError('Insufficient quantity, order failed to create')
    }
    await order.updateInventory()


    res.status(201).json({ order })
    // res.send('added order')
}



module.exports = { getAllOrders, createOrder }