package edu.polytech.pfe.collectingsensordata;

import android.app.Activity;
import android.app.Notification;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;
import android.support.v4.app.NotificationCompat;
import android.support.v4.app.NotificationManagerCompat;
import android.support.v4.view.ViewPager;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.squareup.otto.Subscribe;

import java.util.List;

import edu.polytech.pfe.collectingsensordata.data.Sensor;
import edu.polytech.pfe.collectingsensordata.events.BusProvider;
import edu.polytech.pfe.collectingsensordata.events.NewSensorEvent;

/**
 * Created by Haykel on 28/01/2015.
 */
public class HealthRateDatasActivity extends Activity {

    private RemoteSensorManager remoteSensorManager;

    TextView textView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.healthratedatas);
        textView = (TextView) findViewById(R.id.tvHealthRate);
        remoteSensorManager = RemoteSensorManager.getInstance(this);
        remoteSensorManager.startMeasurement();
        remoteSensorManager.getSensors();
        //remoteSensorManager.getSensor(24).getName();
        int i=0;
        String msg="";
        for(i=0;i<remoteSensorManager.getSensors().size();i++) {
            msg+="Sensor N° : " + i + " " + remoteSensorManager.getSensor(i).getName()+"\n";
        }

        textView.setText(msg);

    }


    @Subscribe
    public void onNewSensorEvent(final NewSensorEvent event) {

        textView.setText(remoteSensorManager.getSensors().size()+"hhhhh");

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();

        if (id == R.id.action_about) {

            startActivity(new Intent(this, AboutActivity.class));
            return true;
        }


        if (id == R.id.menu_healthrate) {

            startActivity(new Intent(this, HealthRateDatasActivity.class));
            return true;
        }

        return super.onOptionsItemSelected(item);
    }







    public void sendNotification()
    {
        Notification notification = new NotificationCompat.Builder(getApplication())
                .setSmallIcon(R.drawable.ic_launcher)
                .setContentTitle("Haykel OUHICHI")
                .setContentText("Phone is Connected to Moto 360\n Getting Health Rate Data\n(Sensor id = 24)")
                .extend(
                        new NotificationCompat.WearableExtender().setHintShowBackgroundOnly(false))
                .build();

        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(getApplication());

        int notificationId = 1;
        notificationManager.notify(notificationId, notification);
    }
}
