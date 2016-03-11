app.controller("LogaraControl", function ($scope, LogaraService) {
    $scope.divLog = false;     // div za editiranje (otvori se na add i update)
    $scope.active = false;     // mijenja START i STOP botune
    $scope.comment = false;    // input za koment
    $scope.tempSTART;

    $scope.filterYear;
    //= function (input) {
    //    if (input.START.getFullYear() == $scope.filterYear)
    //        return input;
    //};
    $scope.filterMonth;

    // PAGING
    $scope.currentPage = 0;
    $scope.logLength;
    $scope.pageMax = 10;
    $scope.paging = function () {
        console.log("Switching to " + $scope.pageSize.selectedOption.id + " per page");
        $scope.pageMax = $scope.pageSize.selectedOption.id;
        $scope.noPages = Math.ceil($scope.logLength / $scope.pageMax);
        $scope.currentPage = 0;
    }
    $scope.pageSize = {
        availableOptions: [
          { id: '5', value: 5 },
          { id: '10', value: 10 },
          { id: '20', value: 20 }
        ],
        selectedOption: { id: '10' }
    };

    GetAllLogs();

    // pretvaranje datetime-a u korišteni format
    function parseDate(datetime) {
        var substringedDate;
        var parsedIntDate;

        substringedDate = datetime.substring(6);   // substringedDate= 1291548407008)/
        parsedIntDate = parseInt(substringedDate); // parsedIntDate= 1291548407008
        datetime = new Date(parsedIntDate);        // parsedIntDate u datetime
        datetime = datetime.getDate().toString() + "." + (datetime.getMonth() + 1).toString() + "." + datetime.getFullYear().toString() + ". " + datetime.getHours().toString() + ":" + datetime.getMinutes().toString() + ":" + datetime.getSeconds().toString();
        return datetime;
    }

    // dobavljanje svih unosa
    function GetAllLogs() {
        console.log("Dobavljanje svih unosa");

        // debugger;
        var getLogData = LogaraService.getLogs();
        getLogData.then(function (log) {

            // ispravi format datuma
            $scope.logs = log.data;
            for (var i = 0; i < $scope.logs.length; i++) {
                $scope.logs[i].START = parseDate($scope.logs[i].START);
                $scope.logs[i].STOP = parseDate($scope.logs[i].STOP);
            }

            // za straničenje
            $scope.logLength = $scope.logs.length;
            $scope.noPages = Math.ceil($scope.logLength / $scope.pageMax);
        }, function () {
            console.log('Error in getting log records');
        });
    }

    $scope.editLog = function (log) {
        var getLogData = LogaraService.getLog(log.ID);
        getLogData.then(function (_log) {
            $scope.log = _log.data;
            $scope.logID = log.ID;
            $scope.logSTART = log.START;
            $scope.logSTOP = log.STOP;
            $scope.logNOTE = log.NOTE;
            $scope.Action = "Update";
            $scope.divLog = true;
        }, function () {
            console.log('Error in getting log records');
        });
    }

    // glavna funkcija za dodavanje i mijenjanje unosa
    $scope.addUpdateLog = function () {
        var Log = {
            START: $scope.logSTART,
            STOP: $scope.logSTOP,
            NOTE: $scope.logNOTE,
        };
        var getLogAction = $scope.Action;

        console.log("START:"+Log.START);

        if (getLogAction == "Update") {
            Log.ID = $scope.logID;
            var getLogData = LogaraService.updateLog(Log);
            getLogData.then(function (msg) {
                GetAllLogs();
                console.log(msg.data);
                $scope.divLog = false;
            }, function () {
                console.log('Error in updating log record');
            });
        } else {
            var getLogData = LogaraService.AddLog(Log);
            getLogData.then(function (msg) {
                GetAllLogs();
                console.log(msg.data);
                $scope.divLog = false;
            }, function () {
                console.log('Error in adding log record');
            });
        }
    }

    $scope.AddLogDiv = function () {
        ClearFields();
        $scope.Action = "Add";
        $scope.divLog = true;
    }

    $scope.cancel = function () {
        $scope.divLog = false;
    };

    $scope.deleteLog = function (log) {
        var getLogData = LogaraService.DeleteLog(log.ID);
        getLogData.then(function (msg) {
            console.log(msg.data);
            GetAllLogs();
        }, function () {
            console.log('Error in deleting log record');
        });
    }

    function ClearFields() {
        $scope.logID = "";
        $scope.logSTART = "";
        $scope.logSTOP = "";
        $scope.logNOTE = "";
    }

    $scope.getTime = function () {
        ClearFields();
        $scope.active = true;
        $scope.comment = true;
        $scope.logSTART = new Date();

        $scope.tempSTART = $scope.logSTART;
        //$scope.logSTOP = "1.2.1990 11:11:11";
        //$scope.Action = "Add";
        //$scope.addUpdateLog();
    };

    $scope.endTime = function () {
        $scope.active = false;
        $scope.logSTOP = new Date();

        $scope.Action = "Add"; // TODO treba bit update

        //$scope.Action = "Update"
        //$scope.logSTART = $scope.tempSTART;

        $scope.addUpdateLog();
        $scope.logNOTE = "";
    };

    $scope.saveComment = function () {
        $scope.comment = false;

        //$scope.Action = "Update";
        //$scope.AddUpdateLog();
    };
});