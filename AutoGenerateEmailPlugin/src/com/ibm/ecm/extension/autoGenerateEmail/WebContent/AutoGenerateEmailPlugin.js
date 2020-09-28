/*
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
require(["dojo/aspect",
        "dojo/dom",
        "dojo/dom-construct",
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/array",
        "dojo/json",
        "dojo/parser",
        "dojo/store/Memory",
        "dojo/store/JsonRest",
        "dojo/keys",
        "dojo/string",
        "dojo/window",
        "dijit/form/ComboBox",
        "ecm/widget/dialog/EmailDialog",
        "ecm/model/Desktop"
], function(aspect, dom, domConstruct, declare, lang, array, JSON, parser, Memory, JsonRest, keys, string, win, ComboBox, EmailDialog, Desktop) {

    var section = "to"; // can be to, cc or bcc
    var inputType = "_Combo";

    // replace validation TextBox with ComboBox
    aspect.after(EmailDialog.prototype, "createEmailAddressListInput", function(input) {
        var emailListPS = Desktop.pluginSettings && Desktop.pluginSettings.AutoGenerateEmailPlugin && Desktop.pluginSettings.AutoGenerateEmailPlugin.emailList;

        if (emailListPS) { //build dataStore
            var tempData = [];
            var id = null;
            var email = null;;
            for (i = 0; i < emailListPS.length; i++) {
                id = i;
                email = emailListPS[i];
                tempData.push({email:email, id:id});
            }
            var emailList = new Memory({data: tempData});
        }
        else {
            var emailList = new Memory();
        }

        if (input && input.input.id.includes(section) && !input.input.id.includes(inputType)) {
        // if this is the section of interest (To), replace Validation textbox with a combo box
            for (i = 0; i < input.list._itemsNode.childNodes.length; i++) {
                if (input.list._itemsNode.childNodes[i].id.includes(section)) {
                    var destroyID = input.list._itemsNode.childNodes[i].id;
                    domConstruct.destroy(destroyID);
                }
            }

            _onInputKeyUp = function(e) {
                if (e && e.keyCode === keys.ENTER) {
                    if (input.input.isValid()) {
                        _addInputToList();
                    }
                    else {
                        input.input.validate(); // shows the error
                    }
                } else if (_hasInputSeparator()) {
                    _addInputToList();
                }
            };

            _onInputBlur = function() {
                if (input.input.get("value") != "") {
                    _addInputToList();
                }
            };

            _hasInputSeparator = function() {
                var value = input.input.get("value");
                if (value.length > 0) {
                    var startLookup = false;
                    for (var i = 0; i < value.length; i++) {
                        var c = value[i];
                        if (startLookup) {
                            if (_isSeparator(c))
                                return true;
                        } else if (!_isSeparator(c)) {
                            startLookup = true;
                        }
                    }
                }
                return false;
            };

            _addInputToList = function() {
                if (input.input.isValid()) {
                    array.forEach(_parseInput(), "this.list.addItem({ id: item, displayName: item });", input);
                    input.input.set("value", "");
                } else {
                    input.input.validate(); // shows the error
                }
            };

            _parseInput = function() {
                var inputValue = input.input.get("value"), values = [], value = "";
                for (var i = 0; i < inputValue.length; i++) {
                    var c = inputValue[i];
                    if (_isSeparator(c)) {
                        if (value.length > 0) {
                            values.push(value);
                        }
                        value = "";
                    } else {
                        value += c;
                    }
                }
                if (value.length > 0)
                    values.push(value);

                return values;
            };

            _isSeparator = function(c) {
                return c == " " || c == ";" || c == ",";
            };

            _getValueAttr = function() {
                return array.map(input.list.getItems(), "return item.id;");
            };

            _setValueAttr = function(values) {
                input.list.removeAllItems();
                array.forEach(values, function(value) {
                    if (value.match(EmailDialog.emailAddressPattern)) {
                        input.list.addItem({
                            id: value,
                            displayName: value
                        });
                    }
                }, this);
            };

            focus = function() {
                input.focus();
            };

            isValid = function() {
                return input.input.isValid();
            };

            onChange = function() {
            };

            destroy = function() {
                this.inherited(arguments);

                if (input) {
                    input.input.destroy();
                    delete input.input;
                }
            };

            input.input = new ComboBox({
                id: input.id + inputType,
                invalidMessage: input.input.invalidMessage,
                store: emailList,
                searchAttr: "email",
                autocomplete: true,
                onKeyUp: _onInputKeyUp,
                onBlur: _onInputBlur,
                onChange: onChange,
            }).placeAt(input.list._itemsNode);

            input.own(aspect.after(input.list, "onItemRemoved", function() {
                onChange();
            }));

            input.own(aspect.after(input.list, "onItemAdded", function() {
                input.input.placeAt(input.list._itemsNode);
                setTimeout(function(){
                    input.input.focus();
                    win.scrollIntoView(input.input.domNode);
                    onChange();
                });
            }));

        }
        return input;
    });

});
