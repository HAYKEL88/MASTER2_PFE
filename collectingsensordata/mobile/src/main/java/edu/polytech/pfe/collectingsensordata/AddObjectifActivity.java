package edu.polytech.pfe.collectingsensordata;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Iterator;
import android.os.Handler;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicHeader;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.R.string;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.ParseException;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;
import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import edu.polytech.pfe.collectingsensordata.pojo.Session;
import android.widget.Spinner;

import edu.polytech.pfe.collectingsensordata.WebServices.WebServiceProperties;

public class AddObjectifActivity extends Activity {

    private static final String SERVICE_URL = (new WebServiceProperties()).getURL()+"objectifs";
    Session userSession = new Session();

    private String array_spinnerObjectifs[]=
            {"Reduce my weignt","Ensure a good body","Improve the quality of sleep","Objectif 4","Objectif 5","Objectif 6","Objectif 7"};
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
        WebServiceTask wst = new WebServiceTask(WebServiceTask.POST_TASK, this, "Adding Objectif...");



        wst.addNameValuePair("userEmail", userSession.getUser().getEmail());
        wst.addNameValuePair("priority", array_spinnerPriority[spinnerPriority.getSelectedItemPosition()]);
        wst.addNameValuePair("comments",etComments.getText().toString());
        wst.addNameValuePair("name",array_spinnerObjectifs[spinnerName.getSelectedItemPosition()]);
        wst.addNameValuePair("admin", "0");

        // the passed String is the URL we will POST to
        wst.execute(new String[] { SERVICE_URL });
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
        private static final int CONN_TIMEOUT = 10000;

        // socket timeout, in milliseconds (waiting for data)
        private static final int SOCKET_TIMEOUT = 10000;

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