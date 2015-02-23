package edu.polytech.pfe.collectingsensordata.pojo;

/**
 * Created by Haykel on 22/02/2015.
 */
public class Sensor {

    public String id;
    public String name;
    public String value;
    public String date;
    public String time;
    public String userEmail;
    public String accuracy;
    public String timeStamp;


    public Sensor()
    {

    }


    public Sensor(String id, String name, String value, String date, String time, String userEmail, String accuracy, String timeStamp) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.date = date;
        this.time = time;
        this.userEmail = userEmail;
        this.accuracy = accuracy;
        this.timeStamp = timeStamp;
    }


    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getValue() {
        return value;
    }

    public String getDate() {
        return date;
    }

    public String getTime() {
        return time;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getAccuracy() {
        return accuracy;
    }

    public String getTimeStamp() {
        return timeStamp;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setAccuracy(String accuracy) {
        this.accuracy = accuracy;
    }

    public void setTimeStamp(String timeStamp) {
        this.timeStamp = timeStamp;
    }


    @Override
    public String toString() {
        return "Sensor{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", value='" + value + '\'' +
                ", date='" + date + '\'' +
                ", time='" + time + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", accuracy='" + accuracy + '\'' +
                ", timeStamp='" + timeStamp + '\'' +
                '}';
    }
}
