# Auto-Generate Email plug-in

This plug-in enables the HTML-based email service to auto-generate emailList when user begins entering value in the "To" section. It can be modified to affect the cc and/or bcc section.
As an admin user, you can utilize the configuration Pane of the plugin to modify/update the list of emails that will be auto-generated when using HTML-based email service.

### Prerequisites

* IBM Content Navigator 3.0.7
* J2EE library

### Installing the plug-in

1. If you would like to build this plug-in, proceed with step 2; otherwise, you can download the [autoGenerateEmailPlugin.jar](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/CustomEmailPlugin/autoGenerateEmailPlugin.jar) file and skip to step 6.
2. Download the Auto-Generate Email plug-in from [GitHub](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/AutoGenerateEmailPlugin).
3. Create a **lib** directory under the AutoGenerateEmailPlugin.
4. Copy the all dependencies into the **lib** directory (alternatively, you can update the **classpath** in the build.xml file included with the plug-in).
    * **navigatorAPI.jar** provided with IBM Content Navigator
    * **j2ee.jar** included with the application server
5. Build the plug-in JAR file by running Apache Ant.

    ```
    C:\> cd C:\AutoGenerateEmailPlugin
    C:\AutoGenerateEmailPlugin> ant
    ```
6. [Register and configure the plug-in in IBM Content Navigator.](http://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.8/com.ibm.installingeuc.doc/eucco012.htm)
7. Set the desired **default subject and message**, save the plug-in and restart ICN.
8. Reload IBM Content Navigator to use the register the changes.