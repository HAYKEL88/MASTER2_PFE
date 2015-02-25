package edu.polytech.pfe.collectingsensordata;


import edu.polytech.pfe.collectingsensordata.pojo.Session;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;

public class WelcomeAdminActivity extends Activity {
    TextView tvWelcomeAdmin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_welcome_admin);
        tvWelcomeAdmin = (TextView) findViewById(R.id.tvWelcomeAdmin);
        tvWelcomeAdmin.setText("Welcome Admin : Choose one menu option");
    }


    public void updateProfile(View view) {
        Intent intent = new Intent(this, UpdateAdminActivity.class);
        startActivity(intent);
    }



    public void usersList(View view) {
        Intent intent = new Intent(this, ShowUsersActivity.class);
        startActivity(intent);
    }


    public void showReclamations(View view) {
        Intent intent = new Intent(this, ShowReclamationsActivity.class);
        startActivity(intent);
    }


    public void addRule(View view) {
        Intent intent = new Intent(this,AddRuleActivity.class);
        startActivity(intent);
    }


    public void rulesList(View view) {
        Intent intent = new Intent(this, ShowRulesActivity.class);
        startActivity(intent);
    }


    public void addObjectif(View view) {
        Intent intent = new Intent(this, AddObjectifAdminActivity.class);
        startActivity(intent);
    }



}
