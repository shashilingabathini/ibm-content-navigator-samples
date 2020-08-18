# Document Filter plug-in

This plugin is used to specify document mime types that can be uploaded, using ICN Add-Item dialogue. Hence, restrict mime types that are not specified.
In the Admin Configuration Pane, you can enter allowed mime types using the format **file type/extension**. For example a CSV and PDF document will be defined as text/csv and application/pdf respectively.


### Prerequisites

* IBM Content Navigator 3.0.7 iFix 1 or later
* J2EE library
* [DocumentFilter Plugin Jar](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/DocumentFilterPlugin). Download and ant-build the jar

### Installing the plug-in

1. Download the DocumentFilter plug-in from [GitHub](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/DocumentFilterPlugin).
2. Create a **lib** directory under the DocumentFilter.
3. Copy the all dependencies into the **lib** directory (alternatively, you can update the **classpath** in the build.xml file included with the plug-in).
4. Edit the icn web path in build.properties, and also reference the path to the downloaded Dojo ToolKit.
5. Build the plug-in JAR file by running Apache Ant.

    ```
    C:\> cd C:\DocumentFilterPlugin
    C:\DocumentFilterPlugin> ant
    ```
6. [Register and configure the plug-in in IBM Content Navigator.](http://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.7/com.ibm.installingeuc.doc/eucco012.htm)
