/*
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
require(["dojo/aspect",
        "dojo/_base/declare",
        "dojo/_base/lang",
        "ecm/widget/dialog/EmailDialog",
        "ecm/model/Desktop"
], function(aspect, declare, lang, EmailDialog, Desktop) {

    //before _loadDefaults is called, add the subject and message values as parameters to loadDefaults method
    aspect.before(EmailDialog.prototype, "loadDefaults", function(callback) {
        var subject = Desktop.pluginSettings && Desktop.pluginSettings.CustomEmail && Desktop.pluginSettings.CustomEmail.subject;
        var message = Desktop.pluginSettings && Desktop.pluginSettings.CustomEmail && Desktop.pluginSettings.CustomEmail.message;

        this.subjectInput.set("value", subject);
        this.messageInput.set("value", message);

    });
});
