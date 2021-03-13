package com.ibm.ecm.extension.editMessage;


import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.event.annotations.*;
import com.ibm.ecm.event.messages.*;
import com.ibm.ecm.extension.PluginServiceCallbacks;

public class EditMessagePluginEventHandler {
    /**
     * ActionMessage
     *     private final int number;
     *     private final String text;
     *     private final String explanation;
     *     private final String userResponse;
     *     private final String adminResponse;
     *     private final Exception exception;
     *     public HashMap<String,String> message;
     *     */
    public void editAddDocumentFailedMessage(@Observes @MessageKey("additem.error.failed") @MessageType("error") ActionMessage message, HttpServletRequest request, PluginServiceCallbacks callbacks) {
        String exceptionCause = message.getException().getMessage();
        String newText = message.getText() + " is caused by: " + exceptionCause;
        message.generateNewMessage(message.getNumber(), newText, message.getExplanation(), message.getUserResponse(), message.getAdminResponse());

    }

    public void editErrorMessages(@Observes @MessageType("error") ActionMessage message, HttpServletRequest request, PluginServiceCallbacks callbacks) {
//        String exceptionCause = message.getException().getMessage();
//        String newText = message.getText() + " is caused by: " + exceptionCause;
//        message.generateNewMessage(message.getNumber(), newText, message.getExplanation(), message.getUserResponse(), message.getAdminResponse());

    }

    public void editAllMessages(@Observes ActionMessage message, HttpServletRequest request, PluginServiceCallbacks callbacks) {
//        message.generateNewMessage(message.getNumber(), message.getText(), message.getExplanation(), message.getUserResponse(), message.getAdminResponse());

    }

}