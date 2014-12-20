package edu.polytech.pojo;

public class Objectif {

	public String name;
	public String priority;
	public String Comments;
	
	public Objectif() {
		// TODO Auto-generated constructor stub
	}
	
	public Objectif(String name, String priority, String comments) {
		super();
		this.name = name;
		this.priority = priority;
		Comments = comments;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public String getComments() {
		return Comments;
	}

	public void setComments(String comments) {
		Comments = comments;
	}

	@Override
	public String toString() {
		return "Objectif [name=" + name + ", priority=" + priority
				+ ", Comments=" + Comments + "]";
	}
	
	
}
