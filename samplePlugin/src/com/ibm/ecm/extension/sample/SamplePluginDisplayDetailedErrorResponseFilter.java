/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2019
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.sample;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.extension.PluginResponseFilter;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

/**
 * This sample filter modifies the open content class JSON to demonstrate the following capabilities:
 * <ol>
 * <li>To remove "Like" operators from properties that have a choice list (applied to all classes).</li>
 * <li>To add a custom property formatter. Custom property formatters can be used to provide an alternate widget for the
 * property values in the property display grid. The custom property formatter for this sample is in
 * com.ibm.ecm.extension.sample.WebContent.samplePluginDojo.SamplePropertyFormatter.js</li>
 * <li>To add a custom property editor. Custom property editors can be used to provide an alternate widget for the
 * editable properties shown in the add/edit properties dialog. The custom property editor for this sample is in
 * com.ibm.ecm.extension.sample.WebContent.samplePluginDojo.SamplePropertyEditor.js</li>
 * </ol>
 * To prevent the results changes from always happening, the logic will only take effect if the desktop's ID is
 * "sample". It also only effects the following classes, unless otherwise noted above:
 * <ol>
 * <li>P8 - Document</li>
 * <li>CM8 - NOINDEX</li>
 * </ol>
 */
public class SamplePluginDisplayDetailedErrorResponseFilter extends PluginResponseFilter {

    public String[] getFilteredServices() {
        //services to listen for
        return new String[] { "/p8/openContentClass", "/cm/openContentClass" };
    }

    public void filter(String service, PluginServiceCallbacks callbacks, HttpServletRequest request, JSONObject jsonResponse) throws Exception {
        String methodName = "filter";
        PluginLogger logger = callbacks.getLogger();
        try {
            JSONArray errors = (JSONArray)(jsonResponse.get("errors"));
            if (errors != null) {
                JSONObject updatedMessage = (JSONObject) errors.get(0);
                //exeClassName + exeMessage contains the class name and exception message respectively
                String exeClassName = (String) updatedMessage.get("exceptionClassName");
                String exeMessage = (String) updatedMessage.get("exceptionMessage");
            }



        } catch (EDSException e) {
            logger.logError(this, methodName, request, "EDSException: " + e);
        }
    }

}
