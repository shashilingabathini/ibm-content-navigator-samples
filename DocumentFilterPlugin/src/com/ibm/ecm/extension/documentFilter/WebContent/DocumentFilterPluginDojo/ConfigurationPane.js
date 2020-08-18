/*
 * Licensed Materials - Property of IBM (c) Copyright IBM Corp. 2020  All Rights Reserved.
 *
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 *
 * DISCLAIMER OF WARRANTIES :
 *
 * Permission is granted to copy and modify this Sample code, and to distribute modified versions provided that both the
 * copyright notice, and this permission notice and warranty disclaimer appear in all copies and modified versions.
 *
 * THIS SAMPLE CODE IS LICENSED TO YOU AS-IS. IBM AND ITS SUPPLIERS AND LICENSORS DISCLAIM ALL WARRANTIES, EITHER
 * EXPRESS OR IMPLIED, IN SUCH SAMPLE CODE, INCLUDING THE WARRANTY OF NON-INFRINGEMENT AND THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. IN NO EVENT WILL IBM OR ITS LICENSORS OR SUPPLIERS BE LIABLE FOR
 * ANY DAMAGES ARISING OUT OF THE USE OF OR INABILITY TO USE THE SAMPLE CODE, DISTRIBUTION OF THE SAMPLE CODE, OR
 * COMBINATION OF THE SAMPLE CODE WITH ANY OTHER CODE. IN NO EVENT SHALL IBM OR ITS LICENSORS AND SUPPLIERS BE LIABLE
 * FOR ANY LOST REVENUE, LOST PROFITS OR DATA, OR FOR DIRECT, INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR PUNITIVE
 * DAMAGES, HOWEVER CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, EVEN IF IBM OR ITS LICENSORS OR SUPPLIERS HAVE
 * BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
 */


define([
    "dojo/_base/lang",
	"dojo/_base/declare",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"ecm/widget/HoverHelp",
	"ecm/widget/MultiValueInputPane",
	"ecm/widget/DropDownInput",
	"ecm/widget/admin/PluginConfigurationPane",
	"dojo/text!./templates/ConfigurationPane.html"
], function(lang, declare, _TemplatedMixin, _WidgetsInTemplateMixin, HoverHelp, MultiValueInputPane, DropDownInput, PluginConfigurationPane, template) {
	return declare("DocumentFilterPluginDojo.ConfigurationPane", [ PluginConfigurationPane, _TemplatedMixin, _WidgetsInTemplateMixin], {

		templateString: template,
		widgetsInTemplate: true,

		postCreate: function(){
		    this._createMultiValueInputPane();
		},

		load: function(callback) {
		    this._multiValueInputPane.onShow();
		    this.configurationString = this._multiValueInputPane.getValue();
		},

		_onFieldChange: function() {
			this.onSaveNeeded(true);
		},

		_buildInputPaneObj: function(){
		    var values = ["text/pdf","text/xml","text/plain", "text/csv", "image/tiff", "image/png", "image/jpeg", "application/pdf"];
		    var data = {"values":values, "readOnly":false, "invalidMessage":"This is an invalid operation", "dataType": "xs:string"};
		    return data;
		},

		_createMultiValueInputPane: function(baseConstraints) {
            // create a new MultiValueChoicePane and add all of our data to it
            var list = this._buildInputPaneObj();

            this._multiValueInputPane = new MultiValueInputPane({
            								allowDuplicateValues: true,
            								hasSorting: true,
            								trimStrings: false
            							});
            // DOJO recommends we call the startup function on dynamic DOM object creation
            this._multiValueInputPane.setData(list);
            this._multiValueInputPane.setEditable(true);
            this._multiValueInputContainer.appendChild(this._multiValueInputPane.domNode);
            this._multiValueInputPane.startup();
            this._multiValueInputPane.onShow();

        }
	});
});