/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.customDefaultEmail;

import java.util.Locale;
import com.ibm.ecm.extension.*;

public class CustomDefaultEmailPlugin extends Plugin {

	public static String pluginId = "CustomDefaultEmail";
	private PluginResponseFilter[] responseFilters = null;

	@Override
	public String getId() {
		return "CustomDefaultEmailPlugin";
	}

	@Override
	public String getName(Locale locale) {
		return "Custom Default Email Plugin";
	}

	@Override
	public String getVersion() {
		return "3.0.9";
	}

	@Override
	public String getScript() {
		return "CustomDefaultEmailPlugin.js";
	}

	@Override
	public String getDojoModule() {
		return "customDefaultEmailPluginDojo";
	}

	@Override
	public String getConfigurationDijitClass() {
		return "customDefaultEmailPluginDojo.ConfigurationPane";
	}


	@Override
	public PluginResponseFilter[] getResponseFilters() {
		if (responseFilters == null) {
			responseFilters = new PluginResponseFilter[] { new CustomDefaultEmailPluginResponseFilter() };
		}
		return responseFilters;
	}

}