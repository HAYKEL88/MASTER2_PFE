package edu.polytech.pfe.collectingsensordata;

import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ListView;
import android.widget.*;
import android.view.*;

import com.squareup.otto.Subscribe;

import java.util.Arrays;
import java.util.List;

import edu.polytech.pfe.collectingsensordata.data.Sensor;
import edu.polytech.pfe.collectingsensordata.events.BusProvider;
import edu.polytech.pfe.collectingsensordata.events.NewSensorEvent;


public class CollectingDataActivity extends ActionBarActivity {

    static int sensorsNumber=0;
    static String[] values = new String[30];
    ArrayAdapter<String> adapter=null;
    private RemoteSensorManager remoteSensorManager;
    ListView listView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_collectingdata);

        remoteSensorManager = RemoteSensorManager.getInstance(this);

        // Get ListView object from xml
        listView = (ListView) findViewById(R.id.list);




    }


    public void start(View view) {

        // Defined Array values to show in ListView
        values = new String[]{"A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H"
        };

        BusProvider.getInstance().register(this);
        List<Sensor> sensors = RemoteSensorManager.getInstance(this).getSensors();
        if (sensors.size() > 0) {
            values[0] = "OK " + sensors.size();
        } else {
            values[0] = "KO";
        }

        adapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_list_item_1, android.R.id.text1, values);
        // Assign adapter to ListView
        listView.setAdapter(adapter);

        remoteSensorManager.startMeasurement();

    }

    public void get(View view) {

        String datas=remoteSensorManager.getSensor(1).getName();
        for(int i=0;i<remoteSensorManager.getSensor(1).getDataPoints().size();i++)
            datas+="  "+ Arrays.toString(remoteSensorManager.getSensor(1).getDataPoints().get(i).getValues());
        values[1]=datas;
        adapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_list_item_1, android.R.id.text1, values);
        // Assign adapter to ListView
        listView.setAdapter(adapter);

    }

    public void stop(View view) {
remoteSensorManager.stopMeasurement();
    }



    

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_test, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }




    private void notifyUSerForNewSensor(Sensor sensor) {
        sensorsNumber++;
        values[sensorsNumber]=sensor.getName();

        remoteSensorManager.startMeasurement();
        Toast.makeText(this, "New Sensor!\n" + sensor.getName(), Toast.LENGTH_SHORT).show();


    }

    @Subscribe
    public void HEA(final NewSensorEvent event) {
        notifyUSerForNewSensor(event.getSensor());
    }






}
