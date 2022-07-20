const Order = require("../model/order");
const { BadRequestError } = require("../errors");

const dayInMs = 86400000;

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

let dayInAWeek = [
  { day: "Sunday", revenue: 0 },
  { day: "Monday", revenue: 0 },
  { day: "Tuesday", revenue: 0 },
  { day: "Wednesday", revenue: 0 },
  { day: "Thursday", revenue: 0 },
  { day: "Friday", revenue: 0 },
  { day: "Saturday", revenue: 0 },
];

function getTotal(orders) {
  //reduce the order array to a single value
  return orders.reduce((sum, order) => (sum += order.grossTotal), 0);
}

const getAllOrders = async (req, res) => {
  const { period, get12MonthsData, get7DaysData, getRecentProducts } =
    req.query;
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

  const startOfWeek = new Date(startOfDay.getTime() - (day - 1) * dayInMs);
  const previousDay = new Date(startOfDay.getTime() - (day - 1) * dayInMs);
  const previousWeek = new Date(startOfDay.getTime() - (day + 6) * dayInMs);

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

  if (period) {
    if (period === "daily") {
      queryObject.createdAt = { $gte: startOfDay.toISOString() };
    } else if (period === "weekly") {
      queryObject.createdAt = {
        $gte: new Date(
          startOfDay.getTime() - (day - 1) * dayInMs
        ).toISOString(),
      };
    } else if (period === "monthly") {
      queryObject.createdAt = { $gte: startOfMonth.toISOString() };
    } else {
      throw new BadRequestError("Wrong value for period");
    }
  }

  //This shows previous 12 months of sales inclusive of current month
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

  if (getRecentProducts == "true") {
    let recentOrders = await Order.find(queryObject)
      .sort({ createdAt: -1 })
      .limit(5);
    let recentProducts = [];
    let datesOfPurchase = [];
    for (const order of recentOrders) {
      for (const product of order.products) {
        recentProducts.push(product);
        datesOfPurchase.push(order.createdAt);
        if (recentProducts.length === 5) {
          let tempRecentProduct = recentProducts;
          recentProducts = [];
          res.status(200).json({
            recentProducts: tempRecentProduct,
            orderDates: datesOfPurchase,
          });
          return;
        }
      }
    }
    // for (let idx = orders.length; idx >= 0; idx--) {
    //   let currentOrder = orders[idx];
    //   // currentProducts = currentProducts.products;
    //   console.log(currentOrder);
    //   console.log("okkk");
    //   // for (const product of orders[idx].products) {
    //   //   recentOrder.append(product);
    //   //   if (recentOrder.length === 5) {
    //   //     res.status(200).json({
    //   //       recentOrder,
    //   //     });
    //   //   }
    //   // }
    // }
  }

  if (get7DaysData === "true") {
    var aWeekBefore = new Date();
    aWeekBefore.setDate(aWeekBefore.getDate() - 6);

    let dayShift = day + 1;
    while (dayShift--) {
      dayInAWeek.push(dayInAWeek.shift());
    }

    const AllOrders = await Order.find({ company: req.user.company });
    const filteredThisPeriodOrders = AllOrders.filter(
      order => new Date(order.createdAt) >= aWeekBefore
    );

    filteredThisPeriodOrders.forEach(order => {
      const idx = new Date(order.createdAt).getDay();
      const totalRevenue = order.products.reduce(
        (sum, product) => (sum += product.price * product.quantity),
        0
      );
      dayInAWeek[idx].revenue += totalRevenue;
    });
    const dayInAWeekCopy = dayInAWeek;
    dayInAWeek = [
      { day: "Sunday", revenue: 0 },
      { day: "Monday", revenue: 0 },
      { day: "Tuesday", revenue: 0 },
      { day: "Wednesday", revenue: 0 },
      { day: "Thursday", revenue: 0 },
      { day: "Friday", revenue: 0 },
      { day: "Saturday", revenue: 0 },
    ];
    res.status(200).json({
      dayInAWeek: dayInAWeekCopy,
    });
    return;
  }

  {
    const AllOrders = await Order.find({ company: req.user.company });
    const currentPeriod =
      period === "daily"
        ? startOfDay
        : period === "weekly"
        ? startOfWeek
        : startOfMonth;
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

    //retrieves orders that are created this month/week/today
    const filteredThisPeriodOrders = AllOrders.filter(
      order => new Date(order.createdAt) >= currentPeriod
    );

    //retrieves orders that are created ytd/lastWeek/LastMonth
    const filteredPreviousPeriodOrders = AllOrders.filter(
      order =>
        new Date(order.createdAt) >= previousPeriod &&
        new Date(order.createdAt) < currentPeriod
    );

    const currentPeriodNumberOfOrders = filteredThisPeriodOrders.length;

    const currentPeriodNumberOfProducts = filteredThisPeriodOrders.reduce(
      (count, order) => (count += order.products.length),
      0
    );

    const currentPeriodRevenue = filteredThisPeriodOrders.reduce(
      (totalRevenue, order) => (totalRevenue += order.grossTotal),
      0
    );

    const previousPeriodNumberOfOrders = filteredPreviousPeriodOrders.length;

    const previousPeriodNumberOfProducts = filteredPreviousPeriodOrders.reduce(
      (count, order) => (count += order.products.length),
      0
    );

    const previousPeriodRevenue = filteredPreviousPeriodOrders.reduce(
      (totalRevenue, order) => (totalRevenue += order.grossTotal),
      0
    );

    res.status(200).json({
      orders,

      periodRevenue: currentPeriodRevenue,
      periodRevenueRate: currentPeriodRevenue - previousPeriodRevenue,
      periodOrder: currentPeriodNumberOfOrders,
      periodOrderRate:
        currentPeriodNumberOfOrders - previousPeriodNumberOfOrders,
      periodNumberOfProducts: currentPeriodNumberOfProducts,
      periodNumberOfProductsRate:
        currentPeriodNumberOfProducts - previousPeriodNumberOfProducts,

      orderCount: orders.length,
      revenue: getTotal(orders),
      monthlyRevenue,
    });
  }
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
};

module.exports = { getAllOrders, createOrder };
