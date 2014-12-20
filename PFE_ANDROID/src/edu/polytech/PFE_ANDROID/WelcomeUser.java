package edu.polytech.pfe_android;


import edu.polytech.pojo.Session;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;

public class WelcomeUser extends Activity {

	TextView tvWelcomeUser;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_welcome_user);
		tvWelcomeUser = (TextView) findViewById(R.id.tvWelcomeUser);
		Session sessionUser =new Session();
		tvWelcomeUser.setText("Welcom : "+sessionUser.getUser().getFirstName()+" "+
							sessionUser.getUser().getLastName());
	}

	public void updateProfile(View view) {
		Intent intent = new Intent(this, UpdateUser.class);
		startActivity(intent);
	}
	

	public void addObjectif(View view) {
		Intent intent = new Intent(this, AddObjectif.class);
		startActivity(intent);
	}
	

	public void showObjectifs(View view) {
		Intent intent = new Intent(this, ObjectifsList.class);
		startActivity(intent);
	}
	

	public void sendReclamation(View view) {
		Intent intent = new Intent(this, SendReclamation.class);
		startActivity(intent);
	}
	

	public void sicknesses(View view) {
		Intent intent = new Intent(this, Sicknesses.class);
		startActivity(intent);
	}

}
