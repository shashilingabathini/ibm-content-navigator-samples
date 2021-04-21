/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.emailLookUp;

import java.util.Locale;
import com.ibm.ecm.extension.*;

public class emailLookUpPlugin extends Plugin {

	public static String PLUGIN_ID = "EmailLookUpPlugin";

	@Override
	public String getId() {
		return PLUGIN_ID;
	}

	@Override
	public String getName(Locale locale) {
		return "Email Look-Up Plugin";
	}

	@Override
	public String getVersion() {
		return "3.0.9";
	}

	@Override
	public String getScript() {
		return "emailLookUpPlugin.js";
	}

	@Override
	public String getDojoModule() {
		return "emailLookUpPluginDojo";
	}

	@Override
	public PluginService[] getServices() {
		return new PluginService[] { new emailLookUpPluginService() };
	}

}