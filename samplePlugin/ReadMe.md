# Sample plug-in

This sample plug-in demonstrates how to add various extension points using a plug-in.

## Edit Message via Event Handlers

This sample demonstrates how to edit messages (Information, Warning and Error) displayed in ICN via Event Handlers.
It utilizes ActionMessage.java to manage the messages sent via the event handler.

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

* IBM Content Navigator 3.0.7 iFix 1 or later
* J2EE library
* [Apache Ant](http://ant.apache.org/)
* [Dojo ToolKit](https://dojotoolkit.org/download/)

### Additional Dependencies

* IBM FileNet Content Engine Java API
* IBM Content Manager Java API
* Box Java SDK
* ODWEK Java API
* OpenCMIS Client API
* Apache - Commons lang, Commons IO, Common Codec

### Installing the plug-in
A samplePlugin JAR file is available for use in the samplePlugin's root directory. This can be used directly or built from scratch by following these steps:

1. Download the Sample plug-in from [GitHub](https://github.com/ibm-ecm/ibm-content-navigator-samples/tree/master/samplePlugin).
2. Create a **lib** directory under the SamplePlugin.
3. Copy the all dependencies into the **lib** directory (alternatively, you can update the **classpath** in the build.xml file included with the plug-in).
4. Edit the icn web path in build.properties, and also reference the path to the downloaded Dojo ToolKit.
5. Build the plug-in JAR file by running Apache Ant.

    ```
    C:\> cd C:\samplePlugin
    C:\samplePlugin> ant
    ```
6. [Register and configure the plug-in in IBM Content Navigator.](http://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.7/com.ibm.installingeuc.doc/eucco012.htm)

## Additional references

* [Developing applications with IBM Content Navigator](https://www.ibm.com/support/knowledgecenter/SSEUEX_3.0.7/com.ibm.developingeuc.doc/eucdi000.html)
* [dW Answers forum](https://developer.ibm.com/answers/topics/icn/)
