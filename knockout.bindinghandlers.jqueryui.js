/// <reference path="/Scripts/knockout-2.3.0.debug.js" />
/// <reference path="/Scripts/jquery-1.9.1-vsdoc.js" />
ko.bindingHandlers.jqAutocomplete = {
    init: function (element, valueAccessor) {
        var local = valueAccessor(), observable = valueAccessor().value, options = {};
        ko.utils.extend(options, ko.bindingHandlers.jqAutocomplete.options);
        ko.utils.extend(options, local);

        $(element).addClass(options.class).autocomplete(options);

        $(element).change(function (event) {
            if (observable !== null)
                observable(event.target.value);
        });

        ko.utils.registerEventHandler(element, "autocompleteselect", function (event, ui) {
            if (observable !== null)
                observable(ui.item.value);
        });

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).autocomplete("destroy");
        });
    },
    update: function (element, valueAccessor) {
        $(element).val(ko.unwrap(valueAccessor().value));
    },
    options: {
        minLength: 3,
        class: 'autocomplete'
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
            var selectedDate = moment($(element).datepicker("getDate"));
            if (selectedDate !== null && typeof observable !== 'undefinied' && observable !== null)
                observable(selectedDate.format("MM/DD/YYYY"));
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
        selectOtherMonths: true,
        dateFormat: "mm/dd/yyyy"
    }
};
ko.bindingHandlers.jqDialog = {
    init: function (element, valueAccessor) {
        var local = valueAccessor(), options = {};
        ko.utils.extend(options, ko.bindingHandlers.jqDialog.options);
        ko.utils.extend(options, local);

        $('#' + local.targetid).dialog(options);
        $(element).click(function () { $('#' + local.targetid).dialog('open'); });
    },
    options: {
        autoOpen: false,
        width: 400,
        modal: true,
        open: function () { $('.ui-widget-overlay').bind('click', function () { $(this).siblings('.ui-dialog').find('.ui-dialog-content').dialog('close'); }); }
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
            if (typeof observable !== 'undefined' && observable !== null)
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
        $(element).spinner("value", ko.unwrap(valueAccessor().value));
    },
    options: {
        culture: 'en-US',
        min: 0,
        step: 1
    }
};
ko.bindingHandlers.jqTablesorter = {
    init: function (element, valueAccessor) {
        var options = {};
        ko.utils.extend(options, ko.bindingHandlers.jqSpinner.options);
        ko.utils.extend(options, valueAccessor());

        setTimeout(function () {
            $(element).addClass('tablesorter');
            $(element).tablesorter(options);
        }, 0);
    },
    update: function (element, valueAccessor) {
    },
    options: {
        widgets: ['zebra']
    }
}
ko.bindingHandlers.jqTablesorterPager = {
    init: function (element, valueAccessor) {
        var options = {};
        ko.utils.extend(options, ko.bindingHandlers.jqTablesorterPager.options);
        ko.utils.extend(options, valueAccessor());

        options.container = $(options.container);
        setTimeout(function () {
            $(element).tablesorter().tablesorterPager(options);
        }, 0);
    },
    options: {
        size: 10
    }
}
