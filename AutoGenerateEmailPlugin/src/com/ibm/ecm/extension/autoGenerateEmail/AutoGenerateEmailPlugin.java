/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.autoGenerateEmail;

import java.util.Locale;
import com.ibm.ecm.extension.*;

public class AutoGenerateEmailPlugin extends Plugin {

	public static String PLUGIN_ID = "AutoGenerateEmailPlugin";
	private PluginResponseFilter[] responseFilters = null;

	@Override
	public String getId() {
		return PLUGIN_ID;
	}

	@Override
	public String getName(Locale locale) {
		return "Auto Email Generate Plugin";
	}

	@Override
	public String getVersion() {
		return "3.0.9";
	}

	@Override
	public String getScript() {
		return "AutoGenerateEmailPlugin.js";
	}

	@Override
	public String getDojoModule() {
		return "autoGenerateEmailPluginDojo";
	}

	@Override
	public String getConfigurationDijitClass() {
		return "autoGenerateEmailPluginDojo.ConfigurationPane";
	}

	@Override
	public PluginResponseFilter[] getResponseFilters() {
		return new PluginResponseFilter[] { new AutoGenerateEmailPluginResponseFilter() };
	}

}