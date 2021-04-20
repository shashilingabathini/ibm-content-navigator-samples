/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.autoGenerateEmail;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.ecm.extension.PluginLogger;
import com.ibm.ecm.extension.PluginResponseUtil;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONMessage;
import com.ibm.ecm.json.JSONResponse;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;


public class AutoGenerateEmailPluginService extends PluginService {

    public String getId() {
        return "autoGenerateEmailPluginService";
    }

    public void execute(PluginServiceCallbacks callbacks, HttpServletRequest request, HttpServletResponse response) throws Exception {
        // Log execution
        PluginLogger logger = callbacks.getLogger();
        logger.logEntry(this, "execute");

        JSONResponse jsonResponse = new JSONResponse();
        String query = request.getParameter("query");

        //Import user data
        JSONArray userBase = generateUserList();

        try {
            //create userList function returns JSONArray
            JSONArray userList = fetchUserList(query, userBase);

            //add userList as "userList" in jsonResponse
            jsonResponse.put("userList", userList);

        } catch (Exception e) {
            logger.logError(this, "execute", e);
            jsonResponse.addErrorMessage(new JSONMessage(20000, "Error ocurred while Plugin Service - AutoGenerateEmailPluginService attempted to process a request.", null, null, null, null));

        } finally {
            logger.logExit(this,  "execute");
            // Send the response to the client.
            PluginResponseUtil.writeJSONResponse(request, response, jsonResponse, callbacks, "AutoGenerateEmailPluginService");
        }

    }
    private JSONArray generateUserList() {
        // For the sake of functionality, Static Information will be used
        //generate random userList
        JSONObject userInfo = new JSONObject();
        userInfo.put("name", "Lokesh");
        userInfo.put("email", "lokesh@yahoo.com");
        userInfo.put("userId", "ab12601");

        //Second User
        JSONObject userInfo2 = new JSONObject();
        userInfo2.put("name", "Segun");
        userInfo2.put("email", "segunbattery@energy.com");
        userInfo2.put("userId", "bt33790");

        //Third User
        JSONObject userInfo3 = new JSONObject();
        userInfo3.put("name", "Akash");
        userInfo3.put("email", "akashcars4us@dealer.com");
        userInfo3.put("userId", "cr98098");

        //Fourth User
        JSONObject userInfo4 = new JSONObject();
        userInfo4.put("name", "Raiden");
        userInfo4.put("email", "raidendogincare@pound.com");
        userInfo4.put("userId", "dg9999");

        //Fifth User
        JSONObject userInfo5 = new JSONObject();
        userInfo5.put("name", "Thor");
        userInfo5.put("email", "eggforbreakfast@sunny.com");
        userInfo5.put("userId", "ez88910");

        //Sixth User
        JSONObject userInfo6 = new JSONObject();
        userInfo6.put("name", "Greyhound");
        userInfo6.put("email", "fakenewinvestigation@tv.com");
        userInfo6.put("userId", "fi54210");

        //Seventh User
        JSONObject userInfo7 = new JSONObject();
        userInfo7.put("name", "Alan");
        userInfo7.put("email", "allanirverson@pol.com");
        userInfo7.put("userId", "ai54210");

        //Eight User
        JSONObject userInfo8 = new JSONObject();
        userInfo7.put("name", "Bayo");
        userInfo7.put("email", "buckbillace@pol.com");
        userInfo7.put("userId", "b754210");

        //Add users to list
        JSONArray userList = new JSONArray();
        userList.add(userInfo);
        userList.add(userInfo2);
        userList.add(userInfo3);
        userList.add(userInfo4);
        userList.add(userInfo5);
        userList.add(userInfo6);
        userList.add(userInfo7);
        userList.add(userInfo8);


        return userList;

    }

    private JSONArray fetchUserList(String query, JSONArray totalUserList) {
        // this function searches by name and email
        JSONArray userQueryResponse = new JSONArray();
        String queryLowerCase = query.toLowerCase();
        for (int i = 0; i < totalUserList.size() - 1; i++) {
            //by name
            String subItemName = (String)((JSONObject)totalUserList.get(i)).get("name");
            if (queryLowerCase.equals(subItemName.substring(0,query.length()).toLowerCase())) {
                userQueryResponse.add((JSONObject)totalUserList.get(i));
                continue;
            }

            //by email
            String subItemEmail = (String)((JSONObject)totalUserList.get(i)).get("email");
            if (queryLowerCase.equals(subItemEmail.substring(0,query.length()).toLowerCase())) {
                userQueryResponse.add((JSONObject)totalUserList.get(i));
            }
        }
        return userQueryResponse;
    }
}
