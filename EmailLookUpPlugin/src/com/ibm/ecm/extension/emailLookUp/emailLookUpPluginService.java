/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.emailLookUp;

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

public class emailLookUpPluginService extends PluginService {

    public String getId() {
        return "emailLookUpPluginService";
    }

    public void execute(PluginServiceCallbacks callbacks, HttpServletRequest request, HttpServletResponse response) throws Exception {
        // Log execution
        PluginLogger logger = callbacks.getLogger();
        logger.logEntry(this, "execute");

        JSONResponse jsonResponse = new JSONResponse();
        String query = request.getParameter("query");

        try {
            //create userList function returns JSONArray
            JSONArray userList = fetchUserList(query, userStore());

            //add userList as "userList" in jsonResponse
            jsonResponse.put("userList", userList);

        } catch (Exception e) {
            logger.logError(this, "execute", e);
            jsonResponse.addErrorMessage(new JSONMessage(20000, "Error ocurred while Plugin Service - EmailLookUpPluginService attempted to process a request.", null, null, null, null));

        } finally {
            logger.logExit(this,  "execute");
            // Send the response to the client.
            PluginResponseUtil.writeJSONResponse(request, response, jsonResponse, callbacks, "EmailLookUpPluginService");
        }

    }

    /**
     * This is the source of your data. This function queries the actual store
     * (REST or db) to get/generate users
     * @return userList
     */
    private JSONArray userStore() {
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
        userInfo8.put("name", "Bayo");
        userInfo8.put("email", "buckbillace@pol.com");
        userInfo8.put("userId", "b754210");

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

    private JSONArray fetchUserList(String query, JSONArray userList) {
        // this function searches by name and email
        JSONArray userQueryResponse = new JSONArray();
        String queryLowerCase = query.toLowerCase();
        for (int i = 0; i < userList.size() - 1; i++) {
            //by name
            String name = (String)((JSONObject)userList.get(i)).get("name");
            if (query.length() < name.length() && queryLowerCase.equals(name.substring(0,query.length()).toLowerCase())) {
                userQueryResponse.add((JSONObject)userList.get(i));
                continue;
            }

            //by email
            String email = (String)((JSONObject)userList.get(i)).get("email");
            if (query.length() < email.length() && queryLowerCase.equals(email.substring(0,query.length()).toLowerCase())) {
                userQueryResponse.add((JSONObject)userList.get(i));
            }
        }
        return userQueryResponse;
    }
}
