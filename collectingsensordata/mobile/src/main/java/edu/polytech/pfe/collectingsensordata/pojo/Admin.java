package edu.polytech.pfe.collectingsensordata.pojo;

import java.util.List;

/**
 * Created by Haykel on 22/02/2015.
 */
public class Admin {

    public String id;
    public String firstName;
    public String lastName;
    public String email;
    public String password;
    public List<Service> services;
    public List<Rule> rules;
    public List<Objectif> objectifs;

    public Admin()
    {

    }

    public Admin(String id, String firstName, String lastName, String email, String password, List<Service> services, List<Rule> rules, List<Objectif> objectifs) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.services = services;
        this.rules = rules;
        this.objectifs = objectifs;
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

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public List<Service> getServices() {
        return services;
    }

    public List<Rule> getRules() {
        return rules;
    }

    public List<Objectif> getObjectifs() {
        return objectifs;
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

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setServices(List<Service> services) {
        this.services = services;
    }

    public void setRules(List<Rule> rules) {
        this.rules = rules;
    }

    public void setObjectifs(List<Objectif> objectifs) {
        this.objectifs = objectifs;
    }


    @Override
    public String toString() {
        return "Admin{" +
                "id='" + id + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", services=" + services +
                ", rules=" + rules +
                ", objectifs=" + objectifs +
                '}';
    }
}
