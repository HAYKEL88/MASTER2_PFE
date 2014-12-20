package edu.polytech.pojo;

public class Service {

	
	public String id;
	public String name;
	public String description;
	public String link;
	
	public Service(){
		
	}
	
	
	public Service(String id, String name, String description, String link) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.link = link;
	}
	
	
	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}


	@Override
	public String toString() {
		return "Service [id=" + id + ", name=" + name + ", description="
				+ description + ", link=" + link + "]";
	}
	
	
	
	
	
	
}
