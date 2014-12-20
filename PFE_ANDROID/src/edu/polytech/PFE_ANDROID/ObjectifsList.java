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
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import edu.polytech.pojo.Objectif;
import edu.polytech.pojo.Service;
import edu.polytech.pojo.Session;
import android.app.Activity;
import android.content.Context;

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
import android.widget.AdapterView.OnItemClickListener;


public class ObjectifsList extends Activity {
	    ArrayList<Objectif> ObjectifsList=new ArrayList<Objectif>();
	    MyCustomAdapter dataAdapter = null;
	    Session userSession=null;

	    
		 
		@Override
		protected void onCreate(Bundle savedInstanceState) {
			super.onCreate(savedInstanceState);
			setContentView(R.layout.activity_welcome);
			userSession=new Session();
			ObjectifsList=(ArrayList<Objectif>) userSession.getUser().getObjectifs();
			
			displayListView();
			
		}
		
		
		
		
		
		private void displayListView() {
			 
			  
			 
			  //create an ArrayAdaptar from the String Array
			  dataAdapter = new MyCustomAdapter(this,
			    R.layout.objectifslist, this.ObjectifsList);
			  ListView listView = (ListView) findViewById(R.id.listView1);
			  // Assign adapter to ListView
			  listView.setAdapter(dataAdapter);
			 
			  //enables filtering for the contents of the given ListView
			  listView.setTextFilterEnabled(true);
			 
			  listView.setOnItemClickListener(new OnItemClickListener() {
			   public void onItemClick(AdapterView<?> parent, View view,
			     int position, long id) {
			    // When clicked, show a toast with the TextView text
			    Objectif Objectif = (Objectif) parent.getItemAtPosition(position);
			    Toast.makeText(getApplicationContext(),
			    		Objectif.getName(), Toast.LENGTH_SHORT).show();
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
		
		
		
		
		
		
		
		
		
		
		private class MyCustomAdapter extends ArrayAdapter<Objectif> {
			 
			  private ArrayList<Objectif> originalList;
			  private ArrayList<Objectif> ObjectifList;
			  private ObjectifFilter filter;
			 
			  public MyCustomAdapter(Context context, int textViewResourceId, 
			    ArrayList<Objectif> ObjectifList) {
			   super(context, textViewResourceId, ObjectifList);
			   this.ObjectifList = new ArrayList<Objectif>();
			   this.ObjectifList.addAll(ObjectifList);
			   this.originalList = new ArrayList<Objectif>();
			   this.originalList.addAll(ObjectifList);
			  }
			 
			  @Override
			  public Filter getFilter() {
			   if (filter == null){
			    filter  = new ObjectifFilter();
			   }
			   return filter;
			  }
			 
			 
			  private class ViewHolder {
				   TextView name;
				   TextView priority;
				   TextView comments;
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
			   holder.name = (TextView) convertView.findViewById(R.id.tvObjectifName);
			   holder.priority = (TextView) convertView.findViewById(R.id.tvObjectifPriority);
			   holder.comments = (TextView) convertView.findViewById(R.id.tvObjectifComments);

			 
			   convertView.setTag(holder);
			 
			   } else {
			    holder = (ViewHolder) convertView.getTag();
			   }
			 
			   Objectif Objectif = ObjectifsList.get(position);
			   holder.name.setText(Objectif.getName());
			   holder.priority.setText(Objectif.getPriority());
			   holder.comments.setText(Objectif.getComments());

			   
			 
			   return convertView;
			 
			  }
			 
			  private class ObjectifFilter extends Filter
			  {
			 
			   @Override
			   protected FilterResults performFiltering(CharSequence constraint) {
			 
			    constraint = constraint.toString().toLowerCase();
			    FilterResults result = new FilterResults();
			    if(constraint != null && constraint.toString().length() > 0)
			    {
			    ArrayList<Objectif> filteredItems = new ArrayList<Objectif>();
			 
			    for(int i = 0, l = originalList.size(); i < l; i++)
			    {
			    	Objectif Objectif = originalList.get(i);
			     if(Objectif.toString().toLowerCase().contains(constraint))
			      filteredItems.add(Objectif);
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
			 
				   ObjectifList = (ArrayList<Objectif>)results.values;
			    notifyDataSetChanged();
			    clear();
			    for(int i = 0, l = ObjectifList.size(); i < l; i++)
			     add(ObjectifList.get(i));
			    notifyDataSetInvalidated();
			   }
			  }
			 
			 
			 }

		
		
		

	
	    
	}
	
	