var app = angular.module("LogaraApp", []);

// zove prije nego se popuni
app.filter('pagination', function () {
    return function (input, start) {
        //start = +start;
        return input.slice(start);
    };
});

app.filter('year', function () {
    return function (datetime) {

        // izvadi godinu
        var from = datetime.split(".");
        var f = new Date(from[2], from[1] - 1, from[0]);

        f = f.getFullYear();
        return f.toString();
    };
});

app.filter('month', function () {
    return function (datetime) {

        // izvadi mjesec
        var from = datetime.split(".");
        var f = new Date(from[2], from[1] - 1, from[0]);

        datetime = new Date(datetime);
        f = f.getMonth() + 1;
        return f.toString();
    };
});