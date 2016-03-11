using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Logara.Models;
using System.Diagnostics;

namespace Logara.Controllers
{
    public class HomeController : Controller
    {
        // go home
        public ActionResult Index() {
            return View();
        }

        // get all logs
        public JsonResult GetAllLogs() {
            using (LogaraDBContext contextObj = new LogaraDBContext()) {
                var logList = contextObj.log.ToList(); // dobavlja logove u listu
                return Json(logList, JsonRequestBehavior.AllowGet);
            }
        }

        // get log by ID
        public JsonResult GetLogByID(string ID) {
            using (LogaraDBContext contextObj = new LogaraDBContext()) {
                var logID = Convert.ToInt32(ID);
                var getLogByID = contextObj.log.Find(logID);
                return Json(getLogByID, JsonRequestBehavior.AllowGet);
            }
        }

        // update log
        public string UpdateLog(Log log) {
            if (log != null) {
                using (LogaraDBContext contextObj = new LogaraDBContext()) {
                    int logID = Convert.ToInt32(log.ID);
                    Log _log = contextObj.log.Where(b => b.ID == logID).FirstOrDefault();
                    System.Diagnostics.Debug.Write("DATE:" + log.START);
                    _log.START = log.START;
                    _log.STOP = log.STOP;
                    _log.NOTE = log.NOTE;
                    contextObj.SaveChanges();
                    return "Log record updated";
                }
            }
            else {
                return "Invalid log record";
            }
        }

        // add log
        public string AddLog(Log log) {
            if (log != null) {
                using (LogaraDBContext contextObj = new LogaraDBContext()) {
                    contextObj.log.Add(log);
                    contextObj.SaveChanges();
                    return "Log record added";
                }
            }
            else {
                return "Invalid log record";
            }
        }

        // delete log
        public string DeleteLog(string logID) {

            if (!String.IsNullOrEmpty(logID)) {
                try {
                    int _logID = Int32.Parse(logID);
                    using (LogaraDBContext contextObj = new LogaraDBContext()) {
                        var _log = contextObj.log.Find(_logID);
                        contextObj.log.Remove(_log);
                        contextObj.SaveChanges();
                        return "Selected log record deleted";
                    }
                }
                catch (Exception) {
                    return "Log details not found";
                }
            }
            else {
                return "Invalid operation";
            }
        }
    }
}