package edu.polytech.pfe.collectingsensordata.pojo;

/**
 * Created by Haykel on 23/02/2015.
 */
public class Reclamation {


    public String id;
    public String userEmail;
    public String body;

    public Reclamation()
    {

    }

    public Reclamation(String id, String userEmail, String body) {
        this.id = id;
        this.userEmail = userEmail;
        this.body = body;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    @Override
    public String toString() {
        return "Reclamation{" +
                "userEmail='" + userEmail + '\'' +
                ", body='" + body + '\'' +
                '}';
    }
}
