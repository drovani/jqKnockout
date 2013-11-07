/// <reference path="/Scripts/knockout-2.3.0.debug.js" />
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
ko.bindingHandlers.uniqueNameGroup = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();
        value.name = value.name || (element.name || ko.bindingHandlers.uniqueNameGroup.defaultPrefix) + (++ko.bindingHandlers.uniqueNameGroup.count);
        element.name = value.name;
    },
    count: 0,
    defaultPrefix: 'uniqueNameGroup'
};
