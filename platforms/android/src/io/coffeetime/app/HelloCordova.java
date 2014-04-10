/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package io.coffeetime.app;

import android.os.Bundle;
import android.content.Intent;
import android.text.TextUtils;
import android.util.Log;
import org.apache.cordova.*;

public class HelloCordova extends CordovaActivity
{
    private static final String ACTION_URL_VIEW = "android.intent.action.VIEW";

    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.init();
        // Set by <content src="index.html" /> in config.xml
        super.loadUrl(Config.getStartUrl());
        //super.loadUrl("file:///android_asset/www/index.html");
    }

    @Override
    protected void onNewIntent(Intent intent) {
        if (intent == null) {
            return;
        }

        if (ACTION_URL_VIEW.equals(intent.getAction())) {
            String url = intent.getDataString();

            if(!TextUtils.isEmpty(url)) {
                super.sendJavascript("setTimeout(function() { handleOpenURL('" + url + "'); },1);");
            }
        }
    }
}

