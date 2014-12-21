package edu.polytech.pfe_android;


import edu.polytech.pojo.Session;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;

public class WelcomeAdmin extends Activity {
	TextView tvWelcomeAdmin;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_welcome_admin);
		tvWelcomeAdmin = (TextView) findViewById(R.id.tvWelcomeAdmin);
		tvWelcomeAdmin.setText("Welcome Admin : Choose one menu option");
	}


	public void updateProfile(View view) {
		Intent intent = new Intent(this, UpdateAdmin.class);
		startActivity(intent);
	}
	
	public void addUser(View view) {
		Intent intent = new Intent(this, AddUser.class);
		startActivity(intent);
	}
	
	public void usersList(View view) {
		Intent intent = new Intent(this, UsersList.class);
		startActivity(intent);
	}
	
	public void addSicknesses(View view) {
		Intent intent = new Intent(this, AddWickness.class);
		startActivity(intent);
	}
	
	public void sicknessesList(View view) {
		Intent intent = new Intent(this, Sicknesses.class);
		startActivity(intent);
	}
	
	public void showReclamations(View view) {
		Intent intent = new Intent(this, Reclamations.class);
		startActivity(intent);
	}

	
	public void addRule(View view) {
		Intent intent = new Intent(this, AddRule.class);
		startActivity(intent);
	}

	
	public void rulesList(View view) {
		Intent intent = new Intent(this, RulesList.class);
		startActivity(intent);
	}

	
	
}
