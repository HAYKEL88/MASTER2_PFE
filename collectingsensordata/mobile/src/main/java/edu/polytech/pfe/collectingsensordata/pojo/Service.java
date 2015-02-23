package edu.polytech.pfe.collectingsensordata.pojo;

public class Service {

	
	public String id;
	public String name;
	public String description;
    public String link;
    public String adminEmail;

    public Service()
    {

    }

    public Service(String id, String name, String description, String link, String adminEmail) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.link = link;
        this.adminEmail = adminEmail;
    }


    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getLink() {
        return link;
    }

    public String getAdminEmail() {
        return adminEmail;
    }


    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public void setAdminEmail(String adminEmail) {
        this.adminEmail = adminEmail;
    }


    @Override
    public String toString() {
        return "Service{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", link='" + link + '\'' +
                ", adminEmail='" + adminEmail + '\'' +
                '}';
    }
}
