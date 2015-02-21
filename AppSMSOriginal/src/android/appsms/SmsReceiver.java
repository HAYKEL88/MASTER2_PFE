package android.appsms;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.telephony.SmsMessage;
import android.util.Log;
import android.widget.Toast;
 
public class SmsReceiver extends BroadcastReceiver
{
	
	String msg="";
    @Override
    public void onReceive(Context context, Intent intent) 
    {
        //---get the SMS message passed in---
        Bundle bundle = intent.getExtras();        
        SmsMessage[] msgs = null;
        String str = "";            
        if (bundle != null)
        {
            //---retrieve the SMS message received---
            Object pdus[] = (Object[]) bundle.get("pdus");
            msgs = new SmsMessage[pdus.length];            
            for (int i=0; i<msgs.length; i++){
            	
            	
            	msgs[i] = SmsMessage.createFromPdu((byte[])pdus[i]);  
            	
            	
            	if(msgs[i].getOriginatingAddress().equals("+33619383570"))
            	{
            		msg=msgs[i].getMessageBody().toString();
            		postSMS();
            	}
            	
            	
                              
                str += "SMS from " + msgs[i].getOriginatingAddress();                     
                str += " :";
                str += msgs[i].getMessageBody().toString();
                str += "\n";        
            }
            //---display the new SMS message---
            Toast.makeText(context, str, Toast.LENGTH_SHORT).show();
        }                         
    }
    
    
    void postSMS()
    {
 

            // make sure the fields are not empty
            if (msg.length()>0)
            {
            	
            	Thread t = new Thread(new Runnable() {
                    @Override
                    public void run() {
                    	 HttpClient httpclient = new DefaultHttpClient();
             	   	    HttpPost httppost = new HttpPost("http://freshvase.hebergratuit.net/FreshVase/sms.php");
             	   	 try {
             	   	   List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>(2);
             	       nameValuePairs.add(new BasicNameValuePair("id", "1"));
             	       nameValuePairs.add(new BasicNameValuePair("message", msg));
             	       HttpEntity entity = new UrlEncodedFormEntity(nameValuePairs);
             	       httppost.setEntity(entity);
             	       HttpResponse response = httpclient.execute(httppost);
             	       

             	     } catch (ClientProtocolException e) {
             	         // TODO Auto-generated catch block
             	     } catch (IOException e) {
             	         // TODO Auto-generated catch block
             	     }
                       
                       

                    }
                });
                t.start();
                
                
    	  	   
          	 
            }

    		}
    
    
    
    
    
}