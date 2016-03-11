app.service("LogaraService", function ($http) {

    // get all logs (GET)
    this.getLogs = function () {
        return $http.get("GetAllLogs");
    };

    // get log by logID
    this.getLog = function (logID) {
        var response = $http({
            method: "post",
            url: "GetLogByID",
            params: {
                ID: JSON.stringify(logID)
            }
        });
        return response;
    }

    // update log
    this.updateLog = function (log) {
        var response = $http({
            method: "post",
            url: "UpdateLog",
            data: JSON.stringify(log),
            dataType: "json"
        });
        return response;
    }

    // add log
    this.AddLog = function (log) {
        var response = $http({
            method: "post",
            url: "AddLog",
            data: JSON.stringify(log),
            dataType: "json"
        });
        return response;
    }

    // delete log
    this.DeleteLog = function (logID) {
        var response = $http({
            method: "post",
            url: "DeleteLog",
            params: {
                logID: JSON.stringify(logID)
            }
        });
        return response;
    }
});