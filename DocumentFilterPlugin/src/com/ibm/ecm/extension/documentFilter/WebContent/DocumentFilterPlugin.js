/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
require(["dojo/aspect",
        "dojo/_base/declare",
        "dojo/_base/lang",
        "ecm/model/Request",
        "ecm/model/Repository",
        "ecm/widget/dialog/MessageDialog"
], function(aspect, declare, lang, Request, Repository, MessageDialog) {
    var messagesDialog = null;

    var showErrorMessage = function(message) {
        if (!this._messageDialog) {
          this._messageDialog = new MessageDialog();
        }
        this._messageDialog.showMessage(message);
      };

    aspect.before(Repository.prototype, "_addDocumentItemCompleted", function(response, parentFolder, callback) {
    debugger;
    if (response["fieldErrors"]){
        showErrorMessage("Error Encountered: "+ response.fieldErrors.symbolicName);
        return null;
    }
    return [response, parentFolder, callback];

    });
});
