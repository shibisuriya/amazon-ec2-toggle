module.exports = function updateCron(req, res, next) {
  var date_ob = new Date();
  console.log("Update cron here... ", date_ob);
  next();
};
