package edu.polytech.pfe.collectingsensordata;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.AsyncTask;
import android.util.Log;

import edu.polytech.pfe.collectingsensordata.WebServices.WebServiceProperties;
import edu.polytech.pfe.collectingsensordata.data.Sensor;
import edu.polytech.pfe.collectingsensordata.pojo.Session;
import edu.polytech.pfe.collectingsensordata.shared.DataMapKeys;
import com.google.android.gms.wearable.DataEvent;
import com.google.android.gms.wearable.DataEventBuffer;
import com.google.android.gms.wearable.DataItem;
import com.google.android.gms.wearable.DataMap;
import com.google.android.gms.wearable.DataMapItem;
import com.google.android.gms.wearable.Node;
import com.google.android.gms.wearable.WearableListenerService;

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
import java.util.Arrays;
import java.util.Date;

public class SensorReceiverService extends WearableListenerService {
    private static final String TAG = "CollectingSensorData/SensorReceiverService";
    private static final String SERVICE_URL = (new WebServiceProperties()).getURL() + "sensors";
    private RemoteSensorManager sensorManager;

    private Date lastSendDate, secondSendDate;

    @Override
    public void onCreate() {
        super.onCreate();

        sensorManager = RemoteSensorManager.getInstance(this);

        lastSendDate = new Date();
    }

    @Override
    public void onPeerConnected(Node peer) {
        super.onPeerConnected(peer);

        Log.i(TAG, "Connected: " + peer.getDisplayName() + " (" + peer.getId() + ")");
    }

    @Override
    public void onPeerDisconnected(Node peer) {
        super.onPeerDisconnected(peer);

        Log.i(TAG, "Disconnected: " + peer.getDisplayName() + " (" + peer.getId() + ")");
    }

    @Override
    public void onDataChanged(DataEventBuffer dataEvents) {
        Log.d(TAG, "onDataChanged()");

        for (DataEvent dataEvent : dataEvents) {
            if (dataEvent.getType() == DataEvent.TYPE_CHANGED) {
                DataItem dataItem = dataEvent.getDataItem();
                Uri uri = dataItem.getUri();
                String path = uri.getPath();

                if (path.startsWith("/sensors/")) {
                    unpackSensorData(
                            Integer.parseInt(uri.getLastPathSegment()),
                            DataMapItem.fromDataItem(dataItem).getDataMap()
                    );
                }
            }
        }
    }

    private void unpackSensorData(int sensorType, DataMap dataMap) {
        int accuracy = dataMap.getInt(DataMapKeys.ACCURACY);
        long timestamp = dataMap.getLong(DataMapKeys.TIMESTAMP);
        float[] values = dataMap.getFloatArray(DataMapKeys.VALUES);

        Log.d(TAG, "Received sensor data " + sensorType + " = " + Arrays.toString(values));

        sensorManager.addSensorData(sensorType, accuracy, timestamp, values);

        secondSendDate = new Date();

        long diff = secondSendDate.getTime() - lastSendDate.getTime();


        Log.d(TAG, String.valueOf(secondSendDate.getTime()));
        Log.d(TAG, String.valueOf(lastSendDate.getTime()));


        long diffSeconds = diff / 1000 % 60;
        long diffMinutes = diff / (60 * 1000) % 60;
        long diffHours = diff / (60 * 60 * 1000) % 24;
        long diffDays = diff / (24 * 60 * 60 * 1000);
        Log.d(TAG, "DiffMinutes " + diffMinutes);
        Log.d(TAG, "diffHours " + diffHours);

        try {
            // Send Datas every 10 minutes
            //if (((diffMinutes > 9) && (diffHours == 0)) || ((diffMinutes == (-50)) && (diffHours == 1))) {
            if (((diffMinutes > 0) && (diffHours == 0)) || ((diffMinutes == (-59)) && (diffHours == 1))) {
                int i = 0;
                for (i = 0; i < sensorManager.getSensors().size(); i++) {

                    if ((sensorManager.getSensors().get(i).getDataPoints() != null) && (sensorManager.getSensors().get(i).getDataPoints().size() > 0)) {
                        sendDataToServer(sensorManager.getSensors().get(i));

                        // A vérifier
                        sensorManager.getSensors().get(i).getDataPoints().clear();
                    }
                }
                Log.d(TAG, "condition if ************ ");
                lastSendDate = new Date();
                Log.d(TAG, String.valueOf(lastSendDate.getTime()));
            }

        } catch (Exception ex) {
            Log.d(TAG, "Exception " + ex.getMessage());
        }


    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////




    ////////////////////////////////////////////////////////////////////////////////////////////////////////



    public void sendDataToServer(Sensor sensor)
    {

        DateFormat dateFormat1 = new SimpleDateFormat("dd/MM/yyyy");
        DateFormat dateFormat2 = new SimpleDateFormat("HH:mm:ss");



        int i=0,j=0;
        for(i=0;i<sensor.getDataPoints().size();i++) {
            for(j=0;j<sensor.getDataPoints().get(i).getValues().length;j++) {
                WebServiceTask wst = new WebServiceTask(WebServiceTask.POST_TASK, this, "Posting Sensor Data...");

                wst.addNameValuePair("name", sensor.getName());
                wst.addNameValuePair("value", String.valueOf(sensor.getDataPoints().get(j).getValues()[j]));
                wst.addNameValuePair("date", dateFormat1.format(secondSendDate));
                wst.addNameValuePair("time", dateFormat2.format(secondSendDate));
                wst.addNameValuePair("userEmail", new Session().getUser().getEmail());
                wst.addNameValuePair("accuracy", String.valueOf(sensor.getDataPoints().get(j).getAccuracy()));
                wst.addNameValuePair("timestamp", String.valueOf(sensor.getDataPoints().get(j).getTimestamp()));

                // the passed String is the URL we will POST to
                wst.execute(new String[]{SERVICE_URL});

                Log.d(TAG, "Posting sensor Data to server");
            }
        }
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
        private static final int CONN_TIMEOUT = 10000;

        // socket timeout, in milliseconds (waiting for data)
        private static final int SOCKET_TIMEOUT = 10000;

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
