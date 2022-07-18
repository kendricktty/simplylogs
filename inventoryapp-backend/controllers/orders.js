const Order = require("../model/order");
const { BadRequestError } = require("../errors");

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
    "Dec",
];

function getTotal(orders) {
    //reduce the order array to a single value
    return orders.reduce((sum, order) => (sum += order.grossTotal), 0);
}

const getAllOrders = async (req, res) => {
    const { period, get12MonthsData } = req.query;
    const queryObject = {};
    queryObject.company = req.user.company;

    const today = new Date().toLocaleDateString("en-GB", {
        timeZone: "Singapore",
    });

    const dateArr = today.split("/");

    const sgtISOString =
        dateArr[2] + "-" + dateArr[1] + "-" + dateArr[0] + "T00:00:00.000+08:00";
    const startOfDay = new Date(sgtISOString);

    const sgtStartOfMonthISO =
        dateArr[2] + "-" + dateArr[1] + "-" + "01T00:00:00.000+08:00";
    const startOfMonth = new Date(sgtStartOfMonthISO);
    const day = new Date().getDay();

    const startOfWeek = new Date(startOfDay.getTime() - (day - 1) * 86400000);
    const previousDay = new Date(startOfDay.getTime() - (day - 1) * 86400000);
    const previousWeek = new Date(startOfDay.getTime() - (day + 6) * 86400000);

    const previousMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        1
    );

    previousMonth.setDate(previousMonth.getDate() + 1);

    const previousPreviousDay = new Date(previousDay);
    previousPreviousDay.setDate(previousDay.getDate() - 1);

    const previousPreviousWeek = new Date(previousWeek);
    previousPreviousWeek.setDate(previousWeek.getDate() - 7);


    const previousPreviousMonth = new Date(
        previousMonth.getFullYear(),
        previousMonth.getMonth() - 1,
        1
    );
    //   previousPreviousMonth.setDate(previousPreviousMonth.getDate() + 1);


    //   if (
    //     period &&
    //     period !== "daily" &&
    //     period !== "weekly" &&
    //     period !== "monthly"
    //   ) {
    //     throw new BadRequestError("Wrong value for period");
    //   }

    if (period) {
        if (period === 'daily') {
            queryObject.createdAt = { $gte: startOfDay.toISOString() }
        } else if (period === 'weekly') {
            // console.log(startOfDay.toISOString())
            // console.log(new Date(startOfDay.getTime() - (day - 1) * 86400000).toISOString());
            queryObject.createdAt = { $gte: new Date(startOfDay.getTime() - (day - 1) * 86400000).toISOString() }
        } else if (period === 'monthly') {
            queryObject.createdAt = { $gte: startOfMonth.toISOString() }
        } else {
            throw new BadRequestError("Wrong value for period");
        }
    }

    const monthlyRevenue = [];
    if (get12MonthsData) {
        //substract month function
        function subtractMonths(numOfMonths, date) {
            date.setMonth(date.getMonth() - numOfMonths);
            return date;
        }

        //add month function
        function addMonths(numOfMonths, date) {
            const tempDate = date;
            tempDate.setMonth(date.getMonth() + numOfMonths);
            return tempDate;
        }

        let StartMonth = startOfMonth;

        const EndMonth = addMonths(1, new Date(StartMonth.toISOString()));

        const orders = await Order.find({
            createdAt: {
                $gte: StartMonth.toISOString(),
                $lt: EndMonth.toISOString(),
            },
            company: req.user.company,
        });

        const dataObject = {
            name: month[StartMonth.getMonth()],
            Revenue: getTotal(orders),
        };

        monthlyRevenue.push(dataObject);

        for (let index = 1; index < 12; index++) {
            StartMonth = subtractMonths(1, StartMonth);

            const EndMonth = addMonths(1, new Date(StartMonth.toISOString()));

            const orders = await Order.find({
                createdAt: {
                    $gte: StartMonth.toISOString(),
                    $lt: EndMonth.toISOString(),
                },
                company: req.user.company,
            });

            const dataObject = {
                name: month[StartMonth.getMonth()],
                Revenue: getTotal(orders),
            };

            monthlyRevenue.push(dataObject);
        }
    }

    const orders = await Order.find(queryObject);
    {
        const AllOrders = await Order.find();
        const previousPeriod =
            period === "daily"
                ? previousDay
                : period === "weekly"
                    ? previousWeek
                    : previousMonth;

        const previousPreviousPeriod =
            period === "daily"
                ? previousPreviousDay
                : period === "weekly"
                    ? previousPreviousWeek
                    : previousPreviousMonth;

        const filteredPreviousPeriodOrders = AllOrders.filter(
            order => new Date(order.createdAt) >= previousPeriod
        );

        const filteredPreviousPreviousPeriodOrders = AllOrders.filter(order => {
            let orderDate = new Date(order.createdAt);
            return orderDate <= previousPeriod && orderDate >= previousPreviousPeriod;
        });

        const currentPeriodNumberOfOrders = filteredPreviousPeriodOrders.length;

        const currentPeriodNumberOfProducts =
            filteredPreviousPeriodOrders.reduce(
                (count, order) => (count += order.products.length),
                0
            );

        const currentPeriodRevenue = filteredPreviousPeriodOrders.reduce(
            (totalRevenue, order) => (totalRevenue += order.grossTotal),
            0
        );

        const previousPeriodNumberOfOrders = filteredPreviousPreviousPeriodOrders.length;

        const previousPeriodNumberOfProducts =
            filteredPreviousPreviousPeriodOrders.reduce(
                (count, order) => (count += order.products.length),
                0
            );

        const previousPeriodRevenue =
            filteredPreviousPreviousPeriodOrders.reduce(
                (totalRevenue, order) => (totalRevenue += order.grossTotal),
                0
            );
    
    res.status(200).json({
        orders,

        periodRevenue: currentPeriodRevenue,
        periodRevenueRate: currentPeriodRevenue - previousPeriodRevenue,
        periodOrder: currentPeriodNumberOfOrders,
        periodOrderRate: currentPeriodNumberOfOrders - previousPeriodNumberOfOrders,
        periodNumberOfProducts: currentPeriodNumberOfProducts,
        periodNumberOfProductsRate:
            currentPeriodNumberOfProducts - previousPeriodNumberOfProducts,

        orderCount: orders.length,
        revenue: getTotal(orders),
        monthlyRevenue,
    });}
};

const createOrder = async (req, res) => {
    req.body.createdBy = req.user.userId;
    req.body.company = req.user.company;
    const order = await Order.create(req.body);
    const sufficientQty = await order.validateQuantity();
    if (!sufficientQty) {
        await Order.findOneAndDelete({ _id: order._id });
        throw new BadRequestError("Insufficient quantity, order failed to create");
    }
    await order.updateInventory();

    res.status(201).json({ order });
    // res.send('added order')
};

module.exports = { getAllOrders, createOrder };
