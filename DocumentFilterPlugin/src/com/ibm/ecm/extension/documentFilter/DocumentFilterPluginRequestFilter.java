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

package com.ibm.ecm.extension.documentFilter;

import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.extension.PluginRequestFilter;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.extension.PluginLogger;
import com.ibm.ecm.extension.PluginRequestUtil;
import com.ibm.json.java.JSONObject;
import com.ibm.json.java.JSONArtifact;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

/**
 * Provides a filter for responses from the "getDesktop" service.
 */
public class DocumentFilterPluginRequestFilter extends PluginRequestFilter {

	/**
	 * Returns an array of the services that are extended by this filter.
	 *
	 * @return A <code>String</code> array of names of the services.
	 */
	@Override
	public String[] getFilteredServices() {
		return new String[]{"/p8/addItem", "/cm/addItem", "/cmis/addItem", "/od/addItem", "/box/addItem"};
	}

	@Override
	public JSONObject filter(PluginServiceCallbacks callbacks, HttpServletRequest request, JSONArtifact jsonRequest) throws Exception {
		String methodName = "filter";
		PluginLogger logger = callbacks.getLogger();
		String configStr = callbacks.loadConfiguration(); //contains allowed mime types
		String config[] = configStr.split(",");
		boolean validationErrors = true;
		try {
				JSONObject jsonResponse = new JSONObject();
				JSONObject fieldErrorsJson = new JSONObject();
				String mimeType = request.getParameter("mimetype");

				for (String s : config) {
					if (s.equals(mimeType)) {
						validationErrors = false;
						break;
					}
				}

				if(validationErrors)
				{
					fieldErrorsJson.put("symbolicName","Restricted MimeType");
					fieldErrorsJson.put("errorMessage", "This mime type is not supported, Please add supported mime type or visit Admin Configuration to update allowed mime types");
					jsonResponse.put("fieldErrors", fieldErrorsJson);
					logger.logDebug(this, methodName, request, "Validation error: " + jsonResponse);
					PluginRequestUtil.setRequestParameter(request, "error", "Restricted MimeType");
					return jsonResponse;
				}
			}
		catch (Exception e) {
			logger.logError(this, methodName, request, "EDSException: " + e);
		}
		return null;
	}
}