/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.documentFilter;

import java.util.Locale;
import com.ibm.ecm.extension.*;

public class DocumentFilterPlugin extends Plugin {

	@Override
	public String getId() {
		return "DocumentFilterPlugin";
	}

	@Override
	public String getName(Locale locale) {
		return "Document Filter Plugin";
	}

	@Override
	public String getVersion() {
		return "3.0.9";
	}

	@Override
	public String getScript() {
		return "DocumentFilterPlugin.js";
	}

	@Override
	public String getDojoModule() {
		return "DocumentFilterPluginDojo";
	}

	@Override
	public String getConfigurationDijitClass() {
		return "DocumentFilterPluginDojo.ConfigurationPane";
	}

	@Override
	public PluginRequestFilter[] getRequestFilters() {
		return  new PluginRequestFilter[] { new DocumentFilterPluginRequestFilter() };
	}

}