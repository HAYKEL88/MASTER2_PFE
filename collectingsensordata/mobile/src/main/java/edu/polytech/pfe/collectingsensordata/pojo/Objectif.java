package edu.polytech.pfe.collectingsensordata.pojo;

public class Objectif {

    public String id;
	public String name;
	public String priority;
	public String Comments;
    public String userEmail;
    public String admin;
	
	public Objectif() {
		// TODO Auto-generated constructor stub
	}

    public Objectif(String id, String name, String priority, String comments, String userEmail, String admin) {
        this.id = id;
        this.name = name;
        this.priority = priority;
        Comments = comments;
        this.userEmail = userEmail;
        this.admin = admin;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPriority() {
        return priority;
    }

    public String getComments() {
        return Comments;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getAdmin() {
        return admin;
    }


    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public void setComments(String comments) {
        Comments = comments;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setAdmin(String admin) {
        this.admin = admin;
    }


    @Override
    public String toString() {
        return "Objectif{" +
                "name='" + name + '\'' +
                ", priority='" + priority + '\'' +
                ", Comments='" + Comments + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", admin='" + admin + '\'' +
                '}';
    }
}
