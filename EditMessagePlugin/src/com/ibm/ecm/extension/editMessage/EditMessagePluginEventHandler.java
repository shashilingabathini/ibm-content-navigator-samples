package com.ibm.ecm.extension.editMessage;


import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.event.annotations.*;
import com.ibm.ecm.event.messages.*;
import com.ibm.ecm.extension.PluginServiceCallbacks;

public class EditMessagePluginEventHandler {
    /**
     * ActionMessage
     * Methods:
     *     public int getNumber()
     *     public String getText()
     *     public String getExplanation()
     *     public String getUserResponse()
     *     public String getAdminResponse()
     *     public Throwable getException()
     *     public boolean hasChanged() - checks whether generateNewMessage() was called
     *     public void generateNewMessage(int number, String text, String explanation, String userResponse, String adminResponse)
     **/

    //This method listens for error messages with specific key - add.item.error & message type - error
    public void editAddDocumentFailedMessage(@Observes @MessageKey("additem.error.failed") @MessageType("error") ActionMessage message, HttpServletRequest request, PluginServiceCallbacks callbacks) {
        String exceptionCause = message.getException().getMessage();
        String newText = message.getText() + " is caused by: " + exceptionCause;
        message.generateNewMessage(message.getNumber(), newText, message.getExplanation(), message.getUserResponse(), message.getAdminResponse());
    }

    //This method listens for all error messages
    public void editErrorMessages(@Observes @MessageType("error") ActionMessage message, HttpServletRequest request, PluginServiceCallbacks callbacks) {

    }

    //This method listens for all messages
    public void editAllMessages(@Observes ActionMessage message, HttpServletRequest request, PluginServiceCallbacks callbacks) {

    }

}