package com.example.testjson;


import org.json.JSONException;
import org.json.JSONObject;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import android.view.View;
import android.widget.TextView;
 
public class MainActivity extends Activity {
 
	
	TextView textView;
	
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        textView = (TextView) findViewById(R.id.textView1);
 
 
    }
 
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }
    
    
    
    public void send(View view){

        try {
            JSONObject toSend = new JSONObject();
            toSend.put("msg", "hello");
 
            JSONTransmitter transmitter = new JSONTransmitter();
             transmitter.execute(new JSONObject[] {toSend});
             textView.setText("haykel");
        } catch (JSONException e) {
            e.printStackTrace();
            textView.setText("erreur");
        }
    }
 
}