# Email Look-Up plug-in

This plug-in generates a list of matching users in the Email Dialog when entering values in the To, BCC and CC input section.
The source of the list can queried in the emailLookupPluginService.

### Prerequisites

* IBM Content Navigator 3.0.7 or above
* J2EE library

### Installing the plug-in

1. If you would like to build this plug-in, proceed with step 2; otherwise, you can download the [emailLookUpPlugin.jar](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/CustomEmailPlugin/emailLookUpPlugin.jar) file and skip to step 6.
2. Download the Email Look-Up plug-in from [GitHub](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/AutoGenerateEmailPlugin).
3. Create a **lib** directory under the EmailLookUpPlugin.
4. Copy the all dependencies into the **lib** directory (alternatively, you can update the **classpath** in the build.xml file included with the plug-in).
    * **navigatorAPI.jar** provided with IBM Content Navigator
    * **j2ee.jar** included with the application server
5. Build the plug-in JAR file by running Apache Ant.

    ```
    C:\> cd C:\EmailLookUpPlugin
    C:\EmailLookUpPlugin> ant
    ```
6. [Register and configure the plug-in in IBM Content Navigator.](http://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.8/com.ibm.installingeuc.doc/eucco012.htm)
7. Set the desired **default subject and message**, save the plug-in and restart ICN.
8. Reload IBM Content Navigator to use the register the changes.