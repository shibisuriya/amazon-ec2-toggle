var moment = require("moment");
module.exports = function updateCron(req, res, next) {
  const date = moment().utc();
  const DELAY_IN_MINUTES = 1440;
  console.log("current date = ", date.format("hh:mm:ss a"));
  // Date is getting mutated by .add() method.
  date.add(DELAY_IN_MINUTES, "minutes");
  res.ec2_timer =
    "EC2 will shutdown at " +
    date.format("hh:mm:ss a") +
    " after " +
    DELAY_IN_MINUTES +
    " minutes delay...";
  const minutes = date.format("mm");
  const hour = String(date.hours());
  const day_of_month = date.format("DD");
  const month = date.format("MM");
  const year = date.year();
  cron_express =
    "cron( " +
    +minutes +
    " " +
    +hour +
    " " +
    +day_of_month +
    " " +
    +month +
    " ? " +
    +year +
    " )";
  res.date_components = {
    // minutes: minutes,
    // hour: hour,
    // day_of_month: day_of_month,
    // month: month,
    // year: year,
    date: date.format("DD-MM-yyyy hh:mm:ss a"),
    cron_express: cron_express,
  };
  next();
};
