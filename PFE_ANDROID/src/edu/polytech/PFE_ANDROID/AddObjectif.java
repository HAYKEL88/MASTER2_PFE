package edu.polytech.pfe_android;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;

import edu.polytech.pojo.Objectif;
import edu.polytech.pojo.Session;


import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;

public class AddObjectif extends Activity {
    private static final String SERVICE_URL = "http://10.0.2.2:3000/users/addObjectif";
    Session userSession = new Session();

	private String array_spinnerObjectifs[]=
					{"Objectif 1","Objectif 2","Objectif 3","Objectif 4","Objectif 5","Objectif 6","Objectif 7"};
	private String array_spinnerPriority[]=
					{"HIGH","MEDIUM","LOW"};
	
	Spinner spinnerName;
	Spinner spinnerPriority;
	EditText etComments;
	TextView tvResponse;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_add_objectif);
		spinnerName=(Spinner) findViewById(R.id.spinnerName);
		spinnerPriority=(Spinner) findViewById(R.id.spinnerPriority);
		etComments = (EditText) findViewById(R.id.etComments);
		tvResponse = (TextView) findViewById(R.id.tvResponse);
		ArrayAdapter adapter1 = new ArrayAdapter(this,
		        android.R.layout.simple_spinner_item, array_spinnerObjectifs);
		        spinnerName.setAdapter(adapter1);
	    ArrayAdapter adapter2 = new ArrayAdapter(this,
				android.R.layout.simple_spinner_item, array_spinnerPriority);
				spinnerPriority.setAdapter(adapter2);
				
				
	}

	public void addObjectif(View view) {
		postObjectif();
	}
	
	
	
	
	public void postObjectif()
	{
		WebServiceTask wst = new WebServiceTask(WebServiceTask.POST_TASK, this, "Adding Objectifs...");
		 

        
        wst.addNameValuePair("firstName", userSession.getUser().getFirstName());
        wst.addNameValuePair("lastName", userSession.getUser().getLastName());
        wst.addNameValuePair("age", userSession.getUser().getAge());
		wst.addNameValuePair("sex", userSession.getUser().getSex());	
		wst.addNameValuePair("email", userSession.getUser().getEmail());
		wst.addNameValuePair("height", userSession.getUser().getHeight());
		wst.addNameValuePair("weight", userSession.getUser().getWeight());
		wst.addNameValuePair("password", userSession.getUser().getPassword());
		String ObjectifsString="[";
		int i=0, lengthObjectifs= userSession.getUser().getObjectifs().size();
		for(i=0;i<lengthObjectifs;i++)
		{
			ObjectifsString+="{name :"+userSession.getUser().getObjectifs().get(i).getName()+", ";
			ObjectifsString+="priority :"+userSession.getUser().getObjectifs().get(i).getPriority()+",";
			ObjectifsString+="comments :"+userSession.getUser().getObjectifs().get(i).getComments()+"}, ";
         }
		
		ObjectifsString+="{name :"+array_spinnerObjectifs[spinnerName.getSelectedItemPosition()]+", ";
		ObjectifsString+="priority :"+array_spinnerPriority[spinnerPriority.getSelectedItemPosition()]+",";
		ObjectifsString+="comments :"+etComments.getText().toString()+"}, ";
		userSession.getUser().getObjectifs().add(new Objectif(array_spinnerObjectifs[spinnerName.getSelectedItemPosition()],
				array_spinnerPriority[spinnerPriority.getSelectedItemPosition()], 
				etComments.getText().toString()));
		
		ObjectifsString= ObjectifsString.substring(0, ObjectifsString.length()-2)+"]";
		wst.addNameValuePair("objectifs", ObjectifsString);
 
		
        // the passed String is the URL we will POST to
        wst.execute(new String[] { SERVICE_URL+"/"+userSession.getUser().getId() });
	}
	
	
	////////////////////////////////////////////////////////////////////////////
	
	public void handleResponse(String response) {
                  
        tvResponse.setText(response);
        
        
         
    }
	
	
	
	
	
	////////////////////////////////////////////////////////////////////////////
	
	 private class WebServiceTask extends AsyncTask<String, Integer, String> {
		 
	        public static final int POST_TASK = 1;
	        public static final int GET_TASK = 2;
	         
	        private static final String TAG = "WebServiceTask";
	 
	        // connection timeout, in milliseconds (waiting to connect)
	        private static final int CONN_TIMEOUT = 3000;
	         
	        // socket timeout, in milliseconds (waiting for data)
	        private static final int SOCKET_TIMEOUT = 5000;
	         
	        private int taskType = GET_TASK;
	        private Context mContext = null;
	        private String processMessage = "Processing...";
	 
	        private ArrayList<NameValuePair> params = new ArrayList<NameValuePair>();
	 
	        private ProgressDialog pDlg = null;
	 
	        public WebServiceTask(int taskType, Context mContext, String processMessage) {
	 
	            this.taskType = taskType;
	            this.mContext = mContext;
	            this.processMessage = processMessage;
	        }
	 
	        public void addNameValuePair(String name, String value) {
	 
	        	params.add(new BasicNameValuePair(name, value));
	        }
	 
	        private void showProgressDialog() {
	             
	            pDlg = new ProgressDialog(mContext);
	            pDlg.setMessage(processMessage);
	            pDlg.setProgressDrawable(mContext.getWallpaper());
	            pDlg.setProgressStyle(ProgressDialog.STYLE_SPINNER);
	            pDlg.setCancelable(false);
	            pDlg.show();
	 
	        }
	 
	        @Override
	        protected void onPreExecute() {
	 
	           
	            showProgressDialog();
	 
	        }
	 
	        protected String doInBackground(String... urls) {
	 
	            String url = urls[0];
	            String result = "";
	 
	            HttpResponse response = doResponse(url);
	 
	            if (response == null) {
	                return result;
	            } else {
	 
	                try {
	 
	                    result = inputStreamToString(response.getEntity().getContent());
	 
	                } catch (IllegalStateException e) {
	                    Log.e(TAG, e.getLocalizedMessage(), e);
	 
	                } catch (IOException e) {
	                    Log.e(TAG, e.getLocalizedMessage(), e);
	                }
	 
	            }
	 
	            return result;
	        }
	 
	        @Override
	        protected void onPostExecute(String response) {
	             
	            handleResponse(response);
	            pDlg.dismiss();
	             
	        }
	         
	        // Establish connection and socket (data retrieval) timeouts
	        private HttpParams getHttpParams() {
	             
	            HttpParams htpp = new BasicHttpParams();
	             
	            HttpConnectionParams.setConnectionTimeout(htpp, CONN_TIMEOUT);
	            HttpConnectionParams.setSoTimeout(htpp, SOCKET_TIMEOUT);
	             
	            return htpp;
	        }
	         
	        private HttpResponse doResponse(String url) {
	             
	            // Use our connection and data timeouts as parameters for our
	            // DefaultHttpClient
	            HttpClient httpclient = new DefaultHttpClient(getHttpParams());
	 
	            HttpResponse response = null;
	 
	            try {
	                switch (taskType) {
	 
	                case POST_TASK:
	                    HttpPost httppost = new HttpPost(url);
	                    // Add parameters
	                    httppost.setEntity(new UrlEncodedFormEntity(params));
	 
	                    response = httpclient.execute(httppost);
	                    break;
	                case GET_TASK:
	                    HttpGet httpget = new HttpGet(url);
	                    response = httpclient.execute(httpget);
	                    break;
	                }
	            } catch (Exception e) {
	 
	                Log.e(TAG, e.getLocalizedMessage(), e);
	 
	            }
	 
	            return response;
	        }
	         
	        private String inputStreamToString(InputStream is) {
	 
	            String line = "";
	            StringBuilder total = new StringBuilder();
	 
	            // Wrap a BufferedReader around the InputStream
	            BufferedReader rd = new BufferedReader(new InputStreamReader(is));
	 
	            try {
	                // Read response until the end
	                while ((line = rd.readLine()) != null) {
	                    total.append(line);
	                }
	            } catch (IOException e) {
	                Log.e(TAG, e.getLocalizedMessage(), e);
	            }
	 
	            // Return full string
	            return total.toString();
	        }
	 
	    }
	
	
	
	


    
}