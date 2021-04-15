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
        "dojo/store/util/QueryResults",
        "dijit/form/ComboBox",
        "ecm/widget/dialog/EmailDialog",
        "ecm/model/Desktop",
        "ecm/model/User",
        "ecm/model/Request"
], function(aspect, dom, domConstruct, declare, lang, array, JSON, parser, MemoryStore, JsonRest, keys, string, win, QueryResults, ComboBox, EmailDialog, Desktop, User, Request) {

    var section = "to"; // can be to, cc or bcc
    var inputType = "_Combo";
    var _NO_RESULTS_ID = "NO_RESULTS";
    var _NO_RESULTS_MSG = "No Users Found";
    var _MAX_ROWS = 5;
    var _INTERVAL_LOOKUP =  500;
    

    // replace validation TextBox with ComboBox
    aspect.after(EmailDialog.prototype, "createEmailAddressListInput", function (input) {

        debugger;
        //get email list. Might move this to only work onInputChange
//        var userListPS = Desktop.pluginSettings && Desktop.pluginSettings.AutoGenerateEmailPlugin && Desktop.pluginSettings.AutoGenerateEmailPlugin.emailList;

        var _searchResultsCache = {
        };

        //replace input type
        if (input && input.input.id && input.input.id.includes(section) && !input.input.id.includes(inputType)) {
        // if this is the section of interest (To), and it isn't replaced already replace Validation textbox with a combo box
            for (i = 0; i < input.list._itemsNode.childNodes.length; i++) {
                if (input.list._itemsNode.childNodes[i].id.includes(section)) {
                    var destroyID = input.list._itemsNode.childNodes[i].id;
                    domConstruct.destroy(destroyID);
                }
            }

            /**
             * Display an error if the user has entered text for a user but not selected a valid one.
             */
            onInputBlur = function(evt) {
                debugger;
                if (input.input.value && input.input.value.length > 0) {
                    // cancel pending query
                    if (input.input._queryTimeout) {
                        clearTimeout(input.input._queryTimeout);
                    }
                    // cancel store initialization timeout
                    if (input.input._initializationTimeout) {
                        clearTimeout(input.input._initializationTimeout);
                    }

                    if (!isUserAdded(input.input.value) && isTrueEmail(input.input.value)) {
                        // this is an e-mail address
                        var user = {
                                "id": input.input.value,
                                "name": input.input.value,
                                "query": input.input.value
                            };

                        input.list.addItem({ id: user.id, displayName: user.name, user: user })
                        input.input.placeAt(input.list._itemsNode, "last");
                        input.input._lastQueryString = null;
                        cleanupDropDown();
                        input.input.set("value", "");
                        input.input.onChange();
                    } else {
                        input.input.displayError();
                    }
                }
            };

            /**
             * Adds the user selected in the dropdown to the list of valid users.
             */
            onInputSelect = function(evt){
                debugger;

                // Add the selected item in the dropdown to the list.
                if (input.input.item){
                    if (input.input.item.value == _NO_RESULTS_ID){
                        input.input.set("value", input.input._lastQueryString);
                        input.input.openDropDown();
                    }
                    else {
                        _addInputToList(input.input.item);
                    }
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

            _addInputToList = function(user) {
                debugger;
                input.list.addItem({ id: user.id, displayName: user.email, user: user})
                input.input._lastQueryString = null;
                cleanupDropDown();
                input.input.onFocus();
                input.input.set("value", "");
                input.input.onChange();
            };

            _parseInput = function() {
                debugger;
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


            isValid = function() {
                return input.input.isValid();
            };

            onChange = function() {
            };

            /**
             * Queries for a set of users to display in the dropdown.
             */
            queryForResults = function(maxRows, startIndex, queryString, nextPageDeferred) {
                debugger;
                var methodName = "queryForResults";

                var isBackgroundRequest = true;
                if (nextPageDeferred){
                    isBackgroundRequest = false;
                }

                // start processing
                input.input._processing = true;
                try {
                    var _this = input.input;
                    var users;
                    //write request to service or data source
                    Request.invokePluginService("AutoGenerateEmailPlugin", "autoGenerateEmailPluginService", {
                        requestParams: {
                            query : queryString
                        },
                        requestCompleteCallback: function(response) {
                            if (response && response.userList)
                            {
                                users = response.userList
                                queryForResultsComplete(queryString, startIndex, nextPageDeferred, users);
                            }
                        },
                        backgroundRequest : false,
                        requestFailedCallback: function(errorResponse) {
                            // ignore handline failures
                        }
                    });

                    input.input._lastQueryString = queryString;

                    // clear store to remove existing data if this is a new query
                    if (!nextPageDeferred){
                        cleanupDropDown();
                    }
                } catch (e) {
                    input.input._processing = false;
                    throw e;
                }
            };

            /**
             * Callback for user query, checks to see if the text entered by the user has changed since the query was issued.
             */
            queryForResultsComplete = function(queryText, startIndex, nextPageDeferred, response) {
                debugger;
                var methodName = "queryForResultsComplete";

                var maxResultsReached = response.length > _MAX_ROWS ? true : false;

                // Cache the results.
                var result = {
                    searchResults: response,
                    maxResultsReached: maxResultsReached
                };
                _searchResultsCache[queryText] = result;

                // If the user entered more characters since we issued the query and the last query returned the maximum, we need to get new results.
                if (!nextPageDeferred && (maxResultsReached && (input.input._lastInputLowerCase.indexOf(queryText.toLowerCase()) == 0)&& input.input._lastInput.length > queryText.length)){
                    getUsers();
                }
                else if (!nextPageDeferred && !input.input._lastInputLowerCase.indexOf(queryText.toLowerCase()) == 0){

                    // The user has changed the input and the query returned is no longer valid.
                    getUsers();
                }
                else{
                    input.input._lastQueryString = queryText;
                    displayResults(response, maxResultsReached, startIndex, nextPageDeferred);
                }
            };

            /**
             * Displays a set of users in the dropdown.
             */
            displayResults = function(searchResults, maxResultsReached, startIndex, nextPageDeferred) {
                debugger;
                var methodName = "displayResults";

                try {

                    // If the store hasn't been cleared, do it now for a new query.
                    if (input.input.store.data.length != 0 && searchResults.length <= _MAX_ROWS && !nextPageDeferred){
                        cleanupDropDown();
                    }

                    // add new items to store
                    var newResults = [];
                    var numberOfUsersFound = 0;
                    for (var i = 0; i < searchResults.length; i++) {
                        var user = searchResults[i];

                        // If a user name or email contains extended characters, don't attempt to compare to the user input.
                        var alphaNumPattern = /^[a-zA-Z0-9]*$/;

                        var foundUser = isUserAdded(user.userId);
                        if (foundUser){
                            numberOfUsersFound++;
                        }
                        else if (nextPageDeferred || (!alphaNumPattern.test(user.name) || user.name.toLowerCase().indexOf(input.input._lastInputLowerCase) > -1) || (!alphaNumPattern.test(user.email) || user.email.toLowerCase().indexOf(input.input._lastInputLowerCase) > -1)) {
                            var item = {
                                    "id": user.userId,
                                    "name": user.email ? user.name + " (" + user.email + ")"  : user.name,
                                    "email": user.email,
                                    "query": input.input._lastQueryString,
                            };

                            // Add users to the array that will be based to the combo box control when paging.
                            if (nextPageDeferred && (i >= startIndex + numberOfUsersFound) && (newResults.length < _MAX_ROWS)){
                                newResults.push(item);
                            }

                            // Skip over results that are already in the store.
                            var itemInStore = input.input.store.get(item.id);
                            if (itemInStore){
                                continue;
                            }
                            input.input.store.add(item);
                        }
                    }
                    newResults.total = input.input.store.data.length;

                    if (input.input.store.data.length == 1 && input.input.store.data[0].name.toLowerCase() == input.input._lastInputLowerCase){

                        // If there is a single user and it matches the user input, add to the list without opening the dropdown.
                        _addInputToList(input.input.store.data[0]);
                    }
                    else {

                        if (input.input.store.data.length == 0 && numberOfUsersFound == 0 && input.input._lastQueryString && isTrueEmail(input.input._lastQueryString)) {
                            // this is an e-mail address of a non-provisioned user
                            input.input.store.add({
                                "id": input.input._lastQueryString,
                                "name": input.input._lastQueryString,
                                "query": input.input._lastQueryString,
                            });
                        } else if (input.input.store.data.length == 0){
                            // If there are no results, create an item that will display a message in the dropdown.
                            input.input.store.add({
                                "id": _NO_RESULTS_ID,
                                "value": _NO_RESULTS_ID,
                                "name": _NO_RESULTS_MSG
                            });
                        }

                        // Open the dropdown. Need to timeout so the store is initialized.
                        if (nextPageDeferred){
                            try{
                                nextPageDeferred.total.resolve(input.input.store.data.length);
                                nextPageDeferred.resolve(newResults);
                            }
                            catch (ex) {

                                // If resolving the deferred fails (because they closed the dropdown), reset the input field.
                                input.input.set("value", "");
                                cleanupdropDown();
                            }
                        }
                        else {
                            input.input._initializationTimeout = setTimeout(lang.hitch(this, function() {
                                if (input.input.focused) {
                                    input.input.toggleDropDown();
                                }
                            }));
                        }
                    }
                } finally {
                    input.input._processing = false;
                }
                //this.logExit(methodName);
            };

            isTrueEmail = function(email) {
                var emailReg = /^([a-zA-Z0-9])+([a-zA-Z0-9_.+-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
                return emailReg.test(email);
            };

            /**
             * Checks to see if a user has been added to the list.
             */
            isUserAdded = function(userId){
                var isAdded = false;

                var users = input.list.getItems();
                for (var i = 0; i < users.length; i++) {
                    if (users[i].id == userId){
                        isAdded = true;
                        break;
                    }
                }

                return isAdded;
            };

            /**
             * Clears the store and the dropdown.
             */
            cleanupDropDown = function() {
                debugger;

                // close dropdown
                input.input.closeDropDown();

                // remove all items from store
                var items = new Array();
                for (var i = 0; i < input.input.store.data.length; i++) {
                    items[items.length] = input.input.store.data[i];
                }
                for (var i = 0; i < items.length; i++) {
                    input.input.store.remove(items[i].id);
                    if (dojo.byId(items[i].id)) {
                        dojo.destroy(items[i].id);
                    }
                }
            };

            /**
             * Opens the user lookup dropdown when the user clicks on the text area of the combo box.
             */
            onInputFocus = function(evt) {
                debugger;

                //input.input.setCustomValidationError(null);

                // If the dropdown was closed because it lost focus, re-open it when the user selects the input field
                if (input.input.store.data.length > 0){
                    input.input.openDropDown();
                }
            };

            /**
             * Adds the user selected in the dropdown to the list of valid users.
             */
            onInputSelect =function(evt) {
                debugger;

                // Add the selected item in the dropdown to the list.
                if (input.input.item){
                    if (input.input.item.value == _NO_RESULTS_ID){
                        input.input.set("value", input.input._lastQueryString);
                        input.input.openDropDown();
                    }
                    else {
                        _addInputToList(input.input.item);
                    }
                }
            };

            /**
             * Called when the user types into the user lookup combo box.
             */
            onInputChange = function(evt) {
                debugger;
                var methodName = "onInputChange";

                // keep track of last search criteria
                input.input._lastInput = input.input.get("value").trim();
                input.input._lastInputLowerCase = input.input._lastInput.toLowerCase();
                //this.logDebug(methodName, "input.input._lastInputLowerCase: " + input.input._lastInputLowerCase);

                // hide tooltip if necessary
                if (input.input.userTooltip) {
                    dijit.hideTooltip(input.input.userTooltip);
                    input.input.userTooltip = null;
                }

                // Cancel pending query
                if (input.input._queryTimeout) {
                    clearTimeout(input.input._queryTimeout);
                }

                // show tooltip when navigating up and down in the email dropdown
                if (input.input._tooltipTimeout) {
                    clearTimeout(input.input._tooltipTimeout);
                }
                input.input._tooltipTimeout = setTimeout(lang.hitch(this, function() {
                    if (input.input.dropDown.selected != null && input.input.item && input.input.item.maxResultsTooltip) {
                        var userDiv = dojo.byId(input.input.item.value);
                        if (userDiv && userDiv.firstChild && userDiv.firstChild.innerHTML) {
                            dijit.showTooltip(userDiv.firstChild.innerHTML, userDiv);
                            input.input.userTooltip = userDiv;
                        }
                    }
                }), 1000);

                // Handle special keys.
                if (evt){
                    if (evt.keyCode == keys.ESCAPE || evt.keyCode == keys.UP_ARROW || evt.keyCode == keys.DOWN_ARROW ||
                             evt.keyCode == keys.LEFT_ARROW || evt.keyCode == keys.RIGHT_ARROW || evt.keyCode == keys.PAGE_DOWN ||
                             evt.keyCode == keys.PAGE_UP) {
                        return;
                    }
                    else if (evt.keyCode == keys.ENTER || evt.keyCode == 188 /* comma */){

                        if (input.input.store.data.length > 0 && input.input.dropDown.items.length > 0){

                            // If the dropdown is open, add the first user in the dropdown to the list if there are users in the store.
                            if (!input.input._processing && input.input.dropDown.items[0].value != _NO_RESULTS_ID){
                                var user = input.input.dropDown.items[0];
                                _addInputToList(user);
                                cleanupdropDown();
                            }
                            else if (input.input.value && input.input.value.length > 0 && evt.keyCode == keys.ENTER){
                                input.input.openDropDown();
                            }
                            return;
                        }
                    }
                }

                if (!input.input._processing) {
                    if (input.input._lastInput.length == 0){
                        cleanupdropDown();
                    }
                    else {
                        // If the current string is more specific than the one we issued the last query for and we have all the results, we don't need to do anything.
                        var useCurrent = false;

                        if ((input.input._lastQueryString && input.input._lastInputLowerCase.indexOf(input.input._lastQueryString.toLowerCase()) == 0) && input.input.dropDown.items && input.input.dropDown.items.length > 0){
                            var cachedResult = _searchResultsCache[input.input._lastQueryString];
                            if (!cachedResult.maxResultsReached){

                                // The user may have typed something that doesn't match any values in the current list. See if we have at least one match.
                                var foundMatch = false;
                                for (var index in input.input.dropDown.items){
                                    var item = input.input.dropDown.items[index];
                                    if (item && item.name && (item.name.toLowerCase().indexOf(input.input._lastInputLowerCase) == 0)){
                                        handledFromCache = true;
                                        break;
                                    }
                                }
                            }
                        }

                        if (!useCurrent) {
                            // Get users that matches what the user typed when they pause.
                            input.input._queryTimeout = setTimeout(lang.hitch(this, function() {
                                cleanupDropDown();
                                getUsers();
                            }), _INTERVAL_LOOKUP);
                        }
                    }
                }
            };

            /**
             * Gets a set of users to display in the dropdown based on what the user typed.
             */
            getUsers = function() {
                debugger;
                var methodName = "getUsers";

                var numberNeeded = _MAX_ROWS + 1 + input.list.getItems().length;

                // Before we issue the query, see if we have the results already in cache.
                var usedCache = false;
                var queryString = input.input._lastInput.trim();
                if (_searchResultsCache[queryString]){
                    var cachedResult = _searchResultsCache[queryString];

                    if (cachedResult.searchResults.length >= numberNeeded){
                        input.input._lastQueryString = queryString;
                        displayResults(cachedResult.searchResults, cachedResult.maxResultsReached, false);
                        usedCache = true;
                    }
                }
                if (!usedCache){

                    // Use one more than the max to see if we have more users past the first page.
                    queryForResults(numberNeeded, 0, queryString, false);
                }
            }

            destroy = function() {
                this.inherited(arguments);

                if (input) {
                    input.input.destroy();
                    delete input.input;
                }
            };

            store = new MemoryStore({
				data: [],
				idProperty: "id"
			});

            input.input = new ComboBox({
                id: input.id + inputType,
                invalidMessage: input.input.invalidMessage,
                store: store,
                autocomplete: false,
                onKeyUp: onInputChange, //formerly _onInputKeyUp
                onBlur: onInputBlur,
                onChange: onInputSelect,
                onFocus: onInputFocus,
                autoComplete:false,
                required:false,
                trim:true,
                propercase:false,
                pageSize: _MAX_ROWS,
                autoComplete:false,
            }).placeAt(input.list._itemsNode);

            input.own(aspect.after(input.list, "onItemRemoved", function() {
                onChange();
            }));

            input.own(aspect.around(input.input.store, "query", lang.hitch(input, function(originalQuery){
                return lang.hitch(this, function() {
                    var usersLength = input.list.getItems().length;
                    var options = arguments[1];

                    // When options.start == 0 is handled in getUsers
                    if (options.start > 0){
                        input.input._processing = true;
                        var numberNeeded = options.start + _MAX_ROWS + 1 + usersLength;
                        if (numberNeeded > input.input.store.data.length){
                            //this.logDebug(methodName, "Calling QueryResults");
                            var deferred = new Deferred();
                            deferred.total = new Deferred();
                            var queryResults = new QueryResults(deferred);

                            // Get the next page of results.
                            queryForResults(numberNeeded, options.start, input.input._lastQueryString, deferred);

                            return queryResults;
                        }
                        else {
                            //this.logDebug(methodName, "Options start > 0, returning original query");
                            return (originalQuery.apply(input.input.store, arguments));
                        }
                    }
                    else {
                        //this.logDebug(methodName, "Options start == 0, returning original query");
                        return (originalQuery.apply(input.input.store, arguments));
                    }
                });
            })))

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
