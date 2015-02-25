package edu.polytech.pfe.collectingsensordata;



import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

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
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import edu.polytech.pfe.collectingsensordata.WebServices.WebServiceProperties;
import edu.polytech.pfe.collectingsensordata.pojo.Admin;
import edu.polytech.pfe.collectingsensordata.pojo.Objectif;
import edu.polytech.pfe.collectingsensordata.pojo.Session;
import edu.polytech.pfe.collectingsensordata.pojo.User;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

public class SignInActivity extends Activity {

    TextView tvResponse;
    EditText etEmail;
    EditText etPassword;
    private static final String SERVICE_URL = (new WebServiceProperties()).getURL()+"users/signIn";
    ArrayList<User> usersList=new ArrayList<User>();
    ArrayList<Admin> adminsList=new ArrayList<Admin>();


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_in);
        tvResponse = (TextView) findViewById(R.id.tvResponse);
        etEmail = (EditText) findViewById(R.id.etEmail);
        etPassword = (EditText) findViewById(R.id.etPassword);

    }



    public void signIn(View view) {
/*
        Intent intent =null;
        if(etEmail.getText().toString().equals("admin@admin.com")
                &&etPassword.getText().toString().equals("admin"))
        {
            etEmail.setText("");
            etPassword.setText("");
            tvResponse.setTag("Administrateur succesfully authenticated");
            intent = new Intent(this, WelcomeAdminActivity.class);
            startActivity(intent);
        }

        else
        {
            authenticate();
            intent = new Intent(this, WelcomeUserActivity.class);
        }
        */
        if(etEmail.getText().toString().length()>0
                &&etPassword.getText().toString().length()>0) {
            authenticate();
        }

    }


    public void authenticate()
    {
        WebServiceTask wst = new WebServiceTask(WebServiceTask.POST_TASK, this, "Vrifiying Credentials, Please wait...");



        wst.addNameValuePair("email", etEmail.getText().toString());
        wst.addNameValuePair("password", etPassword.getText().toString());

        // the passed String is the URL we will POST to
        wst.execute(new String[] { SERVICE_URL });
    }



    ////////////////////////////////////////////////////////////////////////////

    public void handleResponse(String response) throws JSONException {

        try
        {
            if(response.length()>0)
            {
                JSONObject jso = new JSONObject(response);
                //Try Admin
                Admin adminTemp;
                JSONArray admins = jso.getJSONArray("admins");
                int adminsLength=jso.getJSONArray("admins").length();
                int i=0, j=0,k=0;
                for(i=0;i<adminsLength;i++)
                {
                    adminTemp=new Admin();
                    adminTemp.setId(admins.getJSONObject(i).getString("_id"));
                    adminTemp.setFirstName(admins.getJSONObject(i).getString("firstName"));
                    adminTemp.setLastName(admins.getJSONObject(i).getString("lastName"));
                    adminTemp.setEmail(admins.getJSONObject(i).getString("email"));
                    adminTemp.setPassword(admins.getJSONObject(i).getString("password"));
                    adminsList.add(adminTemp);
                }
                if(adminsLength>0) {
                    tvResponse.setText("Authentication Succeeded : Welcome\n" + adminsList.get(0).getFirstName() + " " + adminsList.get(0).getLastName());
                    Session userSession = new Session();
                    userSession.setAdmin(adminsList.get(0));
                    etEmail.setText("");
                    etPassword.setText("");
                    tvResponse.setText("");
                    Intent intent = new Intent(this, WelcomeAdminActivity.class);
                    startActivity(intent);
                }





                //Try User
                User userTemp;
                JSONArray users = jso.getJSONArray("users");
                int usersLength=jso.getJSONArray("users").length();

                for(i=0;i<usersLength;i++)
                {
                    userTemp=new User();
                    userTemp.setId(users.getJSONObject(i).getString("_id"));
                    userTemp.setFirstName(users.getJSONObject(i).getString("firstName"));
                    userTemp.setLastName(users.getJSONObject(i).getString("lastName"));
                    userTemp.setAge(users.getJSONObject(i).getString("age"));
                    userTemp.setHeight(users.getJSONObject(i).getString("height"));
                    userTemp.setWeight(users.getJSONObject(i).getString("weight"));
                    userTemp.setEmail(users.getJSONObject(i).getString("email"));
                    userTemp.setPassword(users.getJSONObject(i).getString("password"));
                    userTemp.setSex(users.getJSONObject(i).getString("sex"));
                    usersList.add(userTemp);
                }
                if(usersLength>0) {
                    tvResponse.setText("Authentication Succeeded : Welcome\n" + usersList.get(0).getFirstName() + " " + usersList.get(0).getLastName());
                    Session userSession = new Session();
                    userSession.setUser(usersList.get(0));
                    etEmail.setText("");
                    etPassword.setText("");
                    tvResponse.setText("");
                    Intent intent = new Intent(this, WelcomeUserActivity.class);
                    startActivity(intent);
                }

            }
            else

            {
                tvResponse.setText("Authentication Failed");
            }
        }
        catch(Exception ex)
        {
            tvResponse.setText("Error : Try Again");
        }

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

            try {
                handleResponse(response);
            } catch (JSONException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
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