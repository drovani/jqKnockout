/// <reference path="/Scripts/knockout-2.3.0.debug.js" />
/// <reference path="/Scripts/globalize.js" />
ko.bindingHandlers.date = {
    init: function (element, valueAccessor) {
        var observable = valueAccessor();
        var date = moment(observable());
        if (date !== null) {
            var strDate = date.format('MM/DD/YYYY');
            $(element).text(strDate).val(strDate);
        }

        $(element).addClass('date');
    },
    update: function (element, valueAccessor) {
        var observable = valueAccessor();
        var date = moment(observable());
        if (date !== null) {
            var strDate = date.format('MM/DD/YYYY');
            $(element).text(strDate).val(strDate);
        }
    }
};
ko.bindingHandlers.currency = {
    init: function (element, valueAccessor) {
        var observable = valueAccessor();
        if (!isNaN(observable())) {
            var money = Globalize.format(parseFloat(observable()), "c");
            $(element).text(money).val(money);
        }

        $(element).addClass('currency');
    },
    update: function (element, valueAccessor) {
        var observable = valueAccessor();
        if (!isNaN(observable())) {
            var money = Globalize.format(parseFloat(observable()), "c");
            $(element).text(money).val(money);
        }
    }
};
ko.bindingHandlers.number = {
    init: function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor()), displaytext;
        if (!isNaN(value)) {
            if (parseFloat(value) == parseInt(value)) {
                displaytext = Globalize.format(parseInt(value), 'n0');
            } else {
                displaytext = Globalize.format(parseFloat(value), 'n');
            }
            $(element).text(displaytext).val(displaytext);
        }

        $(element).addClass('number');
    },
    update: function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor()), displaytext;
        if (!isNaN(value)) {
            if (parseFloat(value) == parseInt(value)) {
                displaytext = Globalize.format(parseInt(value), 'n0');
            } else {
                displaytext = Globalize.format(parseFloat(value), 'n');
            }
            $(element).text(displaytext).val(displaytext);
        }
    }
};
