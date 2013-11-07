/// <reference path="/Scripts/knockout-2.3.0.debug.js" />
/// <reference path="/Scripts/jquery-2.0.3-vsdoc.js" />
/// <reference path="/Scripts/jquery-ui-1.10.3-vsdoc.js" />
ko.bindingHandlers.jqAutocomplete = {
    init: function (element, valueAccessor) {
        var local = valueAccessor(), observable = valueAccessor().value, options = {};
        ko.utils.extend(options, ko.bindingHandlers.jqAutocomplete.options);
        ko.utils.extend(options, local);

        $(element).autocomplete(options);

        ko.utils.registerEventHandler(element, "autocompleteselect", function (event, ui) {
            if (observable !== null)
                observable(ui.item.value);
        });

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).autocomplete("destroy");
        });
    },
    options: {
        minLength: 3
    }
};
ko.bindingHandlers.jqDatepicker = {
    init: function (element, valueAccessor) {
        var local = valueAccessor(), observable = valueAccessor().value, options = {};
        ko.utils.extend(options, ko.bindingHandlers.jqDatepicker.options);
        ko.utils.extend(options, local);

        if (observable() != null) {
            var strDate = moment(observable()).format("MM/DD/YYYY");
            observable(strDate);
        }
        $(element).datepicker(options);

        ko.utils.registerEventHandler(element, "change", function () {
            observable(moment($(element).datepicker("getDate")).format("MM/DD/YYYY"));
        });

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).datepicker("destroy");
        });
    },
    update: function (element, valueAccessor) {
        $(element).val(ko.unwrap(valueAccessor().value));
    },
    options: {
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true
    }
};
ko.bindingHandlers.jqSpinner = {
    init: function (element, valueAccessor) {
        var local = valueAccessor(), observable = valueAccessor().value, options = {};
        ko.utils.extend(options, ko.bindingHandlers.jqSpinner.options);
        ko.utils.extend(options, local);

        $(element).spinner(options);
        if (valueAccessor().disable === true)
            $(element).spinner("disable");

        ko.utils.registerEventHandler(element, "spinstop", function () {
            if (observable !== null)
                observable($(element).spinner("value"));
        });

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).spinner("destroy");
        });
    },
    update: function (element, valueAccessor) {
        if (valueAccessor().disable === true || valueAccessor().enable === false)
            $(element).spinner("disable");
        else if (valueAccessor().disable === false || valueAccessor().enable === true)
            $(element).spinner("enable");
    },
    options: {
        culture: 'en-US',
        min: 0,
        step: 1
    }
};
ko.bindingHandlers.enterKey = {
    init: function (element, valueAccessor, allBindings, data, context) {
        var wrapper = function (data, event) {
            if (event.keyCode === 13) {
                valueAccessor().call(this, data, event);
            }
        };
        ko.applyBindingsToNode(element, { event: { keyup: wrapper} }, context);
    }
};
