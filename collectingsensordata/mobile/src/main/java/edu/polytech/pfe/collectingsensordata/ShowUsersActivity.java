package edu.polytech.pfe.collectingsensordata;


import java.util.ArrayList;

import edu.polytech.pfe.collectingsensordata.WebServices.WebServiceProperties;
import edu.polytech.pfe.collectingsensordata.pojo.Objectif;
import edu.polytech.pfe.collectingsensordata.pojo.User;
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
public class ShowUsersActivity extends Activity {


    private static final String SERVICE_URL = (new WebServiceProperties()).getURL()+"users";
    ArrayList<User> usersList=new ArrayList<User>();
    MyCustomAdapter dataAdapter = null;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_show_users);

        getUsers();

    }






    private void displayListView() {



        //create an ArrayAdaptar from the String Array
        dataAdapter = new MyCustomAdapter(this,
                R.layout.userslist, this.usersList);
        ListView listView = (ListView) findViewById(R.id.listView1);
        // Assign adapter to ListView
        listView.setAdapter(dataAdapter);

        //enables filtering for the contents of the given ListView
        listView.setTextFilterEnabled(true);

        listView.setOnItemClickListener(new OnItemClickListener() {
            public void onItemClick(AdapterView<?> parent, View view,
                                    int position, long id) {
                // When clicked, show a toast with the TextView text
                User user = (User) parent.getItemAtPosition(position);
                Toast.makeText(getApplicationContext(),
                        user.firstName+" "+user.getLastName(), Toast.LENGTH_SHORT).show();
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










    private class MyCustomAdapter extends ArrayAdapter<User> {

        private ArrayList<User> originalList;
        private ArrayList<User> userList;
        private UserFilter filter;

        public MyCustomAdapter(Context context, int textViewResourceId,
                               ArrayList<User> userList) {
            super(context, textViewResourceId, userList);
            this.userList = new ArrayList<User>();
            this.userList.addAll(userList);
            this.originalList = new ArrayList<User>();
            this.originalList.addAll(userList);
        }

        @Override
        public Filter getFilter() {
            if (filter == null){
                filter  = new UserFilter();
            }
            return filter;
        }


        private class ViewHolder {
            TextView firstName;
            TextView lastName;
            TextView email;
            TextView age;
            TextView password;
            TextView sex;
            TextView height;
            TextView weight;

        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent) {

            ViewHolder holder = null;
            Log.v("ConvertView", String.valueOf(position));
            if (convertView == null) {

                LayoutInflater vi = (LayoutInflater)getSystemService(
                        Context.LAYOUT_INFLATER_SERVICE);
                convertView = vi.inflate(R.layout.userslist, null);

                holder = new ViewHolder();
                holder.firstName = (TextView) convertView.findViewById(R.id.tvFN);
                holder.lastName = (TextView) convertView.findViewById(R.id.tvLN);
                holder.age = (TextView) convertView.findViewById(R.id.tvAge);
                holder.email = (TextView) convertView.findViewById(R.id.tvEmail);
                holder.password = (TextView) convertView.findViewById(R.id.tvPassword);
                holder.sex = (TextView) convertView.findViewById(R.id.tvGender);
                holder.height = (TextView) convertView.findViewById(R.id.tvHeight);
                holder.weight = (TextView) convertView.findViewById(R.id.tvWeight);

                convertView.setTag(holder);

            } else {
                holder = (ViewHolder) convertView.getTag();
            }

            User user = usersList.get(position);
            holder.firstName.setText(user.getFirstName());
            holder.lastName.setText(user.getLastName());
            holder.age.setText(user.getAge());
            holder.email.setText(user.getEmail());
            holder.password.setText(user.getPassword());
            holder.sex.setText(user.getSex());
            holder.height.setText(user.getHeight());
            holder.weight.setText(user.getWeight());


            return convertView;

        }

        private class UserFilter extends Filter
        {

            @Override
            protected FilterResults performFiltering(CharSequence constraint) {

                constraint = constraint.toString().toLowerCase();
                FilterResults result = new FilterResults();
                if(constraint != null && constraint.toString().length() > 0)
                {
                    ArrayList<User> filteredItems = new ArrayList<User>();

                    for(int i = 0, l = originalList.size(); i < l; i++)
                    {
                        User user = originalList.get(i);
                        if(user.toString().toLowerCase().contains(constraint))
                            filteredItems.add(user);
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

                userList = (ArrayList<User>)results.values;
                notifyDataSetChanged();
                clear();
                for(int i = 0, l = userList.size(); i < l; i++)
                    add(userList.get(i));
                notifyDataSetInvalidated();
            }
        }


    }
























    public void getUsers()
    {
        WebServiceTask wst = new WebServiceTask(WebServiceTask.GET_TASK, this, "Getting users...");


        // the passed String is the URL we will GET
        wst.execute(new String[] { SERVICE_URL });
    }


    ////////////////////////////////////////////////////////////////////////////

    public void handleResponse(String response) throws JSONException {

        JSONObject jso = new JSONObject(response);

        User userTemp;

        JSONArray users = jso.getJSONArray("users");
        int usersLength=jso.getJSONArray("users").length();
        int i=0, j=0,k=0;
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