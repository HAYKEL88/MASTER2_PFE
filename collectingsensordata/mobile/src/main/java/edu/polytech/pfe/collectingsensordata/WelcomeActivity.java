package edu.polytech.pfe.collectingsensordata;

import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;

import edu.polytech.pfe.collectingsensordata.WebServices.WebServiceProperties;
import edu.polytech.pfe.collectingsensordata.pojo.Service;
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

import android.os.AsyncTask;
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
import android.widget.TextView;
import android.widget.Toast;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;


public class WelcomeActivity extends ActionBarActivity {

    private static final String SERVICE_URL = (new WebServiceProperties()).getURL()+"Services";
    ArrayList<Service> ServicesList=new ArrayList<Service>();
    MyCustomAdapter dataAdapter = null;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_welcome);

        getServices();

    }


    public void signIn(View view) {
        Intent intent = new Intent(this, SignInActivity.class);
        startActivity(intent);
    }

    public void signUp(View view) {
        Intent intent = new Intent(this, SignUpActivity.class);
        startActivity(intent);
    }

    public void about(View view) {
        Intent intent = new Intent(this, AboutActivity.class);
        startActivity(intent);
    }

//    public void contactUs(View view) {
//        Intent intent = new Intent(this, ContactUsActivity.class);
//        startActivity(intent);
//    }



    private void displayListView() {



        //create an ArrayAdaptar from the String Array
        dataAdapter = new MyCustomAdapter(this,
                R.layout.serviceslist, this.ServicesList);
        ListView listView = (ListView) findViewById(R.id.listView1);
        // Assign adapter to ListView
        listView.setAdapter(dataAdapter);

        //enables filtering for the contents of the given ListView
        listView.setTextFilterEnabled(true);

        listView.setOnItemClickListener(new OnItemClickListener() {
            public void onItemClick(AdapterView<?> parent, View view,
                                    int position, long id) {
                // When clicked, show a toast with the TextView text
                Service Service = (Service) parent.getItemAtPosition(position);
                Toast.makeText(getApplicationContext(),
                        Service.getName(), Toast.LENGTH_SHORT).show();
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










    private class MyCustomAdapter extends ArrayAdapter<Service> {

        private ArrayList<Service> originalList;
        private ArrayList<Service> ServiceList;
        private ServiceFilter filter;

        public MyCustomAdapter(Context context, int textViewResourceId,
                               ArrayList<Service> ServiceList) {
            super(context, textViewResourceId, ServiceList);
            this.ServiceList = new ArrayList<Service>();
            this.ServiceList.addAll(ServiceList);
            this.originalList = new ArrayList<Service>();
            this.originalList.addAll(ServiceList);
        }

        @Override
        public Filter getFilter() {
            if (filter == null){
                filter  = new ServiceFilter();
            }
            return filter;
        }


        private class ViewHolder {
            TextView name;
            TextView description;
            TextView link;
        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent) {

            ViewHolder holder = null;
            Log.v("ConvertView", String.valueOf(position));
            if (convertView == null) {

                LayoutInflater vi = (LayoutInflater)getSystemService(
                        Context.LAYOUT_INFLATER_SERVICE);
                convertView = vi.inflate(R.layout.serviceslist, null);

                holder = new ViewHolder();
                holder.name = (TextView) convertView.findViewById(R.id.tvRuleName);
                holder.description = (TextView) convertView.findViewById(R.id.tvRuleDescription);
                holder.link = (TextView) convertView.findViewById(R.id.tvFormula);


                convertView.setTag(holder);

            } else {
                holder = (ViewHolder) convertView.getTag();
            }

            Service Service = ServicesList.get(position);
            holder.name.setText(Service.getName());
            holder.description.setText(Service.getDescription());
            holder.link.setText(Service.getLink());



            return convertView;

        }

        private class ServiceFilter extends Filter
        {

            @Override
            protected FilterResults performFiltering(CharSequence constraint) {

                constraint = constraint.toString().toLowerCase();
                FilterResults result = new FilterResults();
                if(constraint != null && constraint.toString().length() > 0)
                {
                    ArrayList<Service> filteredItems = new ArrayList<Service>();

                    for(int i = 0, l = originalList.size(); i < l; i++)
                    {
                        Service Service = originalList.get(i);
                        if(Service.toString().toLowerCase().contains(constraint))
                            filteredItems.add(Service);
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

                ServiceList = (ArrayList<Service>)results.values;
                notifyDataSetChanged();
                clear();
                for(int i = 0, l = ServiceList.size(); i < l; i++)
                    add(ServiceList.get(i));
                notifyDataSetInvalidated();
            }
        }


    }
























    public void getServices()
    {
        WebServiceTask wst = new WebServiceTask(WebServiceTask.GET_TASK, this, "Getting services list from server...");


        // the passed String is the URL we will GET
        wst.execute(new String[] { SERVICE_URL });
    }


    ////////////////////////////////////////////////////////////////////////////

    public void handleResponse(String response) throws JSONException {

        JSONObject jso = new JSONObject(response);

        Service ServiceTemp;


        JSONArray Services = jso.getJSONArray("Services");
        int ServicesLength=jso.getJSONArray("Services").length();
        int i=0;
        for(i=0;i<ServicesLength;i++)
        {
            ServiceTemp=new Service();
            ServiceTemp.setName(Services.getJSONObject(i).getString("name"));
            ServiceTemp.setDescription(Services.getJSONObject(i).getString("description"));
            ServiceTemp.setLink(Services.getJSONObject(i).getString("link"));

            ServicesList.add(ServiceTemp);
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