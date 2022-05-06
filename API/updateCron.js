var moment = require("moment");
module.exports = function updateCron(req, res, next) {
  const date = moment().utc();
  const DELAY_IN_MINUTES = 15;
  console.log("current date = ", date.format("hh:mm:ss a"));
  // Date is getting mutated by .add() method.
  date.add(DELAY_IN_MINUTES, "minutes");

  const minutes = date.format("mm");
  const hours = String(date.hours());
  const day_of_month = date.format("DD");
  const month = date.format("MM");
  const year = date.year();
  cron_express =
    "cron( " +
    +minutes +
    " " +
    +hours +
    " " +
    +day_of_month +
    " " +
    +month +
    " ? " +
    +year +
    " )";
  const message =
    "EC2 will shutdown at " +
    date.local().format("hh:mm:ss a") +
    " (Local) after " +
    DELAY_IN_MINUTES +
    " minutes delay...";
  res.middle_ware_data = {
    EC2_timer: message,
    time: date.utc().format("DD-MM-yyyy hh:mm:ss a") + " (UTC)",
    time_components: {
      minutes: +minutes,
      hours: +hours,
      day_of_month: +day_of_month,
      month: +month,
      year: +year,
    },
    cron_expression: cron_express,
  };

  // Write the statements to update the eventBridge rule here, before processing the request.
  next();
};
