package edu.polytech.pfe.collectingsensordata;



import edu.polytech.pfe.collectingsensordata.data.Sensor;
import edu.polytech.pfe.collectingsensordata.events.BusProvider;
import edu.polytech.pfe.collectingsensordata.events.NewSensorEvent;
import edu.polytech.pfe.collectingsensordata.pojo.Session;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.squareup.otto.Subscribe;

import java.util.List;

public class WelcomeUserActivity extends Activity {

    TextView tvWelcomeUser;
    Button startButton;
    Button stopButton;
    private RemoteSensorManager remoteSensorManager;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_welcome_user);

        remoteSensorManager = RemoteSensorManager.getInstance(this);

        tvWelcomeUser = (TextView) findViewById(R.id.tvWelcomeUser);

        startButton = (Button) findViewById(R.id.startCollectingData);

        stopButton = (Button) findViewById(R.id.stopCollectingData);
        Session sessionUser =new Session();
        tvWelcomeUser.setText("Welcome : "+sessionUser.getUser().getFirstName()+" "+
                sessionUser.getUser().getLastName());
    }



    @Override
    public void onStop () {
        remoteSensorManager.stopMeasurement();
        stopButton.setEnabled(false);
        startButton.setEnabled(true);
        super.onStop();

    }


    @Override
    public void onDestroy () {
        remoteSensorManager.stopMeasurement();
        stopButton.setEnabled(false);
        startButton.setEnabled(true);
        super.onStop();

    }

    public void updateProfile(View view) {
        Intent intent = new Intent(this, UpdateUserActivity.class);
        startActivity(intent);
    }


    public void addObjectif(View view) {
        Intent intent = new Intent(this, AddObjectifActivity.class);
        startActivity(intent);
    }


    public void showObjectifs(View view) {
        Intent intent = new Intent(this, ShowObjectifsActivity.class);
        startActivity(intent);
    }


    public void sendReclamation(View view) {
        Intent intent = new Intent(this, SendReclamationActivity.class);
        startActivity(intent);
    }

    public void startCollectingData(View view) {
        BusProvider.getInstance().register(this);
        List<Sensor> sensors = RemoteSensorManager.getInstance(this).getSensors();
        remoteSensorManager.startMeasurement();
        stopButton.setEnabled(true);

    }

    public void stopCollectingData(View view) {
        remoteSensorManager.stopMeasurement();
        stopButton.setEnabled(false);
        startButton.setEnabled(true);
    }


    public void startGPS(View view) {
        Intent intent = new Intent(this, GpsActivity.class);
        startActivity(intent);
    }




    private void notifyUSerForNewSensor(Sensor sensor) {
        startButton.setEnabled(false);
        stopButton.setEnabled(true);
        remoteSensorManager.startMeasurement();

        Toast.makeText(this, "New Sensor!\n" + sensor.getName()+"\n" +
                "\n", Toast.LENGTH_SHORT).show();


    }

    @Subscribe
    public void HEA(final NewSensorEvent event) {
        notifyUSerForNewSensor(event.getSensor());
    }




    ////////////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////////////


}
