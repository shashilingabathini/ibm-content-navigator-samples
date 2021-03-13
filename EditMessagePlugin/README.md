# Edit Message plug-in

This sample plug-in demonstrates how to edit messages (Information, Warning and Error) displayed in ICN via Event Handlers.
This plugin utilizes ActionMessage.java to manage the messages sent via the event handler.

###ActionMessage 
  ####Methods:
	public int getNumber()
	public String getText()
	public String getExplanation()
	public String getUserResponse()
	public String getAdminResponse()
	public Throwable getException()
	public boolean hasChanged() - checks whether generateNewMessage() was called
	public void generateNewMessage(int number, String text, String explanation, String userResponse, String adminResponse)
Within the Event Handler class, the user can define a method with the following annotations:
* @Observes
* @MessageKey - specify the exact error message key to listen for. 
  Examples: additem.error.failed, error.exception.general, desktop.configError, admin.exception.searchaddonfailedtoinstall
* @MessageType - specify the type of message to listen for.
	Options: error, info and warning

## Getting started

Use these instructions to help you get the plug-in up and running in IBM Content Navigator.

### Prerequisites

* IBM Content Navigator 3.0 or later
* J2EE library
* [Apache Ant](http://ant.apache.org/)

### Installing the plug-in

1. Download the Edit Message  plug-in from [GitHub](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/EditMessagePlugin).
2. Create a **lib** directory under the EditMessagePlugin folder.
3. Copy the following libraries to the **lib** directory (alternatively, you can update the **classpath** in the build.xml file included with the plug-in).  
	* **navigatorAPI.jar** provided with IBM Content Navigator
	* **j2ee.jar** included with the application server
4. Build the plug-in JAR file by running Apache Ant.

    ```
    C:\> cd C:\EditMessagePlugin
    C:\EditMessagePlugin> ant
    ```
5. [Register and configure the plug-in in IBM Content Navigator.](http://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.0/com.ibm.installingeuc.doc/eucco012.htm)

## Additional references

* [Number of rows retrieved in an IBM Content Navigator (ICN) search](http://www-01.ibm.com/support/docview.wss?uid=swg21985852)
* [Developing applications with IBM Content Navigator](https://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.0/com.ibm.developingeuc.doc/eucdi000.html)
* [dW Answers forum](https://develop)