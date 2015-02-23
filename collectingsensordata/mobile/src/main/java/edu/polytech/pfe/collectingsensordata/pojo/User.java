package edu.polytech.pfe.collectingsensordata.pojo;

import java.util.List;


public class User {

	public String id;
	public String firstName;
	public String lastName;
	public String age;
	public String email;
	public String height;
	public String weight;
	public String sex;
	public String password;
	public List<Objectif> objectifs;
    public List<Sensor> sensors;

	public User() {
		
	}

    public User(String id, String firstName, String lastName, String age, String email, String height, String weight, String sex, String password, List<Objectif> objectifs, List<Sensor> sensors) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.height = height;
        this.weight = weight;
        this.sex = sex;
        this.password = password;
        this.objectifs = objectifs;
        this.sensors = sensors;
    }


    public String getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getAge() {
        return age;
    }

    public String getEmail() {
        return email;
    }

    public String getHeight() {
        return height;
    }

    public String getWeight() {
        return weight;
    }

    public String getSex() {
        return sex;
    }

    public String getPassword() {
        return password;
    }

    public List<Objectif> getObjectifs() {
        return objectifs;
    }

    public List<Sensor> getSensors() {
        return sensors;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setObjectifs(List<Objectif> objectifs) {
        this.objectifs = objectifs;
    }

    public void setSensors(List<Sensor> sensors) {
        this.sensors = sensors;
    }


    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", age='" + age + '\'' +
                ", email='" + email + '\'' +
                ", height='" + height + '\'' +
                ", weight='" + weight + '\'' +
                ", sex='" + sex + '\'' +
                ", password='" + password + '\'' +
                ", objectifs=" + objectifs +
                ", sensors=" + sensors +
                '}';
    }
}
