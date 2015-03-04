package edu.polytech.pfe.collectingsensordata;


import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Filter;
import android.widget.ListView;
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
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;

import edu.polytech.pfe.collectingsensordata.WebServices.WebServiceProperties;
import edu.polytech.pfe.collectingsensordata.pojo.Reclamation;
import edu.polytech.pfe.collectingsensordata.pojo.Reclamation;


import java.util.ArrayList;

import edu.polytech.pfe.collectingsensordata.WebServices.WebServiceProperties;
import edu.polytech.pfe.collectingsensordata.pojo.Objectif;
import edu.polytech.pfe.collectingsensordata.pojo.Reclamation;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

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
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.ParseException;
import android.os.AsyncTask;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Filter;
import android.widget.ListView;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;
import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
public class ShowReclamationsActivity extends Activity {


    private static final String SERVICE_URL = (new WebServiceProperties()).getURL()+"reclamations";
    ArrayList<Reclamation> reclamationsList=new ArrayList<Reclamation>();
    MyCustomAdapter dataAdapter = null;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_show_reclamations);

        getReclamations();

    }






    private void displayListView() {



        //create an ArrayAdaptar from the String Array
        dataAdapter = new MyCustomAdapter(this,
                R.layout.reclamationslist, this.reclamationsList);
        ListView listView = (ListView) findViewById(R.id.listView1);
        // Assign adapter to ListView
        listView.setAdapter(dataAdapter);

        //enables filtering for the contents of the given ListView
        listView.setTextFilterEnabled(true);

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            public void onItemClick(AdapterView<?> parent, View view,
                                    int position, long id) {
                // When clicked, show a toast with the TextView text
                Reclamation reclamation = (Reclamation) parent.getItemAtPosition(position);
                Toast.makeText(getApplicationContext(),
                        reclamation.userEmail + " :\n" + reclamation.getBody(), Toast.LENGTH_SHORT).show();
            }
        });

        EditText myFilter = (EditText) findViewById(R.id.myFilter);
        myFilter.addTextChangedListener(new TextWatcher() {

            public void afterTextChanged(Editable s) {
            }

            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
            }

            public void onTextChanged(CharSequence s, int start, int before, int count) {
                dataAdapter.getFilter().filter(s.toString());
            }
        });

    }










    private class MyCustomAdapter extends ArrayAdapter<Reclamation> {

        private ArrayList<Reclamation> originalList;
        private ArrayList<Reclamation> reclamationList;
        private ReclamationFilter filter;

        public MyCustomAdapter(Context context, int textViewResourceId,
                               ArrayList<Reclamation> reclamationList) {
            super(context, textViewResourceId, reclamationList);
            this.reclamationList = new ArrayList<Reclamation>();
            this.reclamationList.addAll(reclamationList);
            this.originalList = new ArrayList<Reclamation>();
            this.originalList.addAll(reclamationList);
        }

        @Override
        public Filter getFilter() {
            if (filter == null){
                filter  = new ReclamationFilter();
            }
            return filter;
        }


        private class ViewHolder {
            TextView userEmail;
            TextView description;

        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent) {

            ViewHolder holder = null;
            Log.v("ConvertView", String.valueOf(position));
            if (convertView == null) {

                LayoutInflater vi = (LayoutInflater)getSystemService(
                        Context.LAYOUT_INFLATER_SERVICE);
                convertView = vi.inflate(R.layout.reclamationslist, null);

                holder = new ViewHolder();
                holder.userEmail = (TextView) convertView.findViewById(R.id.tvUserEmail);
                holder.description = (TextView) convertView.findViewById(R.id.tvBody);


                convertView.setTag(holder);

            } else {
                holder = (ViewHolder) convertView.getTag();
            }

            Reclamation reclamation = reclamationsList.get(position);
            holder.userEmail.setText(reclamation.getUserEmail());
            holder.description.setText(reclamation.getBody());



            return convertView;

        }

        private class ReclamationFilter extends Filter
        {

            @Override
            protected FilterResults performFiltering(CharSequence constraint) {

                constraint = constraint.toString().toLowerCase();
                FilterResults result = new FilterResults();
                if(constraint != null && constraint.toString().length() > 0)
                {
                    ArrayList<Reclamation> filteredItems = new ArrayList<Reclamation>();

                    for(int i = 0, l = originalList.size(); i < l; i++)
                    {
                        Reclamation Reclamation = originalList.get(i);
                        if(Reclamation.toString().toLowerCase().contains(constraint))
                            filteredItems.add(Reclamation);
                    }
                    result.count = filteredItems.size();
                    result.values = filteredItems;
                }
                else
                {
                    synchronized(this)
                    {
                        result.values = originalList;
                        result.count = originalList.size();
                    }
                }
                return result;
            }

            @SuppressWarnings("unchecked")
            @Override
            protected void publishResults(CharSequence constraint,
                                          FilterResults results) {

                reclamationList = (ArrayList<Reclamation>)results.values;
                notifyDataSetChanged();
                clear();
                for(int i = 0, l = reclamationList.size(); i < l; i++)
                    add(reclamationList.get(i));
                notifyDataSetInvalidated();
            }
        }


    }
























    public void getReclamations()
    {
        WebServiceTask wst = new WebServiceTask(WebServiceTask.GET_TASK, this, "Getting reclamations...");


        // the passed String is the URL we will GET
        wst.execute(new String[] { SERVICE_URL });
    }


    ////////////////////////////////////////////////////////////////////////////

    public void handleResponse(String response) throws JSONException {

        JSONObject jso = new JSONObject(response);

        Reclamation reclamationTemp;

        JSONArray reclamations = jso.getJSONArray("reclamations");
        int reclamationsLength=jso.getJSONArray("reclamations").length();
        int i=0, j=0,k=0;
        for(i=0;i<reclamationsLength;i++)
        {
            reclamationTemp= new Reclamation();
            reclamationTemp.setId(reclamations.getJSONObject(i).getString("_id"));
            reclamationTemp.setUserEmail(reclamations.getJSONObject(i).getString("userEmail"));
            reclamationTemp.setBody(reclamations.getJSONObject(i).getString("description"));




            reclamationsList.add(reclamationTemp);
        }

        //Generate list View from ArrayList
        displayListView();

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