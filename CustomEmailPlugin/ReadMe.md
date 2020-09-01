# Custom Email plug-in

This plug-in is used to set a default email elements like subject and message, when sending an email using ICN's Email Dialog.

### Prerequisites

* IBM Content Navigator 3.0.7
* J2EE library

### Installing the plug-in

1. Download the CustomEmail plug-in from [GitHub](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/CustomEmailPlugin).
2. If you prefer not to not build this plugin, you can download the [customEmailPlugin.jar](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/DocumentUploadFilterPlugin/customEmailPlugin.jar) file, and skip to step 6.
3. Create a **lib** directory under the CustomEmailPlugin.
4. Copy the all dependencies into the **lib** directory (alternatively, you can update the **classpath** in the build.xml file included with the plug-in).
    * **navigatorAPI.jar** provided with IBM Content Navigator
    * **j2ee.jar** included with the application server
5. Build the plug-in JAR file by running Apache Ant.

    ```
    C:\> cd C:\CustomEmailPlugin
    C:\CustomEmailPlugin> ant
    ```
6. [Register and configure the plug-in in IBM Content Navigator.](http://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.8/com.ibm.installingeuc.doc/eucco012.htm)
7. Set the desired **default subject and message**, save the plug-in and restart ICN.
8. Reload IBM Content Navigator to use the register the changes.