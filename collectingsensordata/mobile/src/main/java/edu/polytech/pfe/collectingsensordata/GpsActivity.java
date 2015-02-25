package edu.polytech.pfe.collectingsensordata;


import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.AsyncTask;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.TextView;
import android.widget.Toast;

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

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import edu.polytech.pfe.collectingsensordata.WebServices.WebServiceProperties;
import edu.polytech.pfe.collectingsensordata.data.Sensor;
import edu.polytech.pfe.collectingsensordata.pojo.Session;

public class GpsActivity extends Activity {
    private static final String SERVICE_URL = (new WebServiceProperties()).getURL() + "sensors";

    private TextView latitude;
    private TextView longitude;
    private TextView choice;
    private CheckBox fineAcc;
    private Button choose;
    private TextView provText;
    private LocationManager locationManager;
    private String provider;
    private MyLocationListener mylistener;
    private Criteria criteria;

    /** Called when the activity is first created. */

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_gps);
        latitude = (TextView) findViewById(R.id.lat);
        longitude = (TextView) findViewById(R.id.lon);
        provText = (TextView) findViewById(R.id.prov);
        choice = (TextView) findViewById(R.id.choice);
        fineAcc = (CheckBox) findViewById(R.id.fineAccuracy);
        choose = (Button) findViewById(R.id.chooseRadio);

        // Get the location manager
        locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        // Define the criteria how to select the location provider
        criteria = new Criteria();
        criteria.setAccuracy(Criteria.ACCURACY_LOW);	//default

        // user defines the criteria
        choose.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                // TODO Auto-generated method stub
                if(fineAcc.isChecked()){
                    criteria.setAccuracy(Criteria.ACCURACY_FINE);
                    choice.setText("fine accuracy selected");
                }else {
                    criteria.setAccuracy(Criteria.ACCURACY_LOW);
                    choice.setText("Low accuracy selected");
                }
            }
        });
        criteria.setCostAllowed(false);
        // get the best provider depending on the criteria
        provider = locationManager.getBestProvider(criteria, false);

        // the last known location of this provider
        Location location = locationManager.getLastKnownLocation(provider);

        mylistener = new MyLocationListener();

        if (location != null) {
            mylistener.onLocationChanged(location);
        } else {
            // leads to the settings because there is no last known location
            Intent intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
            startActivity(intent);
        }
        // location updates: at least 1 meter and 200millsecs change
        locationManager.requestLocationUpdates(provider, 200, 1, mylistener);
    }

    private class MyLocationListener implements LocationListener {

        @Override
        public void onLocationChanged(Location location) {
            // Initialize the location fields
            latitude.setText("Latitude: "+String.valueOf(location.getLatitude()));
            longitude.setText("Longitude: "+String.valueOf(location.getLongitude()));
            provText.setText(provider + " provider has been selected.");

            sendDataToServer("GPS Location",(location.getLatitude()+","+location.getLongitude()),String.valueOf(location.getAccuracy()));

            sendDataToServer("GPS Speed",String.valueOf(location.getSpeed()),String.valueOf(location.getAccuracy()));

            Toast.makeText(GpsActivity.this,  "Location changed!",
                    Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onStatusChanged(String provider, int status, Bundle extras) {
            Toast.makeText(GpsActivity.this, provider + "'s status changed to "+status +"!",
                    Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onProviderEnabled(String provider) {
            Toast.makeText(GpsActivity.this, "Provider " + provider + " enabled!",
                    Toast.LENGTH_SHORT).show();

        }

        @Override
        public void onProviderDisabled(String provider) {
            Toast.makeText(GpsActivity.this, "Provider " + provider + " disabled!",
                    Toast.LENGTH_SHORT).show();
        }
    }






    ////////////////////////////////////////////////////////////////////////////////////////////////////////



    public void sendDataToServer(String dataName,String value, String accuracy)
    {

                DateFormat dateFormat1 = new SimpleDateFormat("dd/MM/yyyy");
                DateFormat dateFormat2 = new SimpleDateFormat("HH:mm:ss");
                Date temp=new Date();

                WebServiceTask wst = new WebServiceTask(WebServiceTask.POST_TASK, this, "Posting Sensor Data...");

                wst.addNameValuePair("name", dataName);
                wst.addNameValuePair("value", value);
                wst.addNameValuePair("date", dateFormat1.format(temp));
                wst.addNameValuePair("time", dateFormat2.format(temp));
                wst.addNameValuePair("userEmail", new Session().getUser().getEmail());
                wst.addNameValuePair("accuracy", accuracy);
                wst.addNameValuePair("timestamp", "0");

                // the passed String is the URL we will POST to
                wst.execute(new String[]{SERVICE_URL});

    }



    ////////////////////////////////////////////////////////////////////////////

    public void handleResponse(String response) {

        /*
        tvResponse.setText(response);
        if(response.contains("Success"))
        {

            Intent intent = new Intent (this,SignInActivity.class);
            startActivity(intent);
        }

        */

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
        private String processMessage = "Posting Sensor Datas to Server...";

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


            //   showProgressDialog();

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

            //    handleResponse(response);
//            pDlg.dismiss();

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































    ////////////////////////////////////////////////////////////////////////////////////////////////////////
























}