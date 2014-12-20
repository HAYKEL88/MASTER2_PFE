package edu.polytech.pojo;

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
	
	public User() {
		
	}
	
	

	



	public User(String id, String firstName, String lastName, String age,
			String email, String height, String weight, String sex,
			String password, List<Objectif> objectifs) {
		super();
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
	}







	public List<Objectif> getObjectifs() {
		return objectifs;
	}


	public void setObjectifs(List<Objectif> objectifs) {
		this.objectifs = objectifs;
	}




	public String getHeight() {
		return height;
	}



	public void setHeight(String height) {
		this.height = height;
	}



	public String getWeight() {
		return weight;
	}



	public void setWeight(String weight) {
		this.weight = weight;
	}



	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getAge() {
		return age;
	}
	public void setAge(String age) {
		this.age = age;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	@Override
	public String toString() {
		return "User [id=" + id + ", firstName=" + firstName + ", lastName="
				+ lastName + ", age=" + age + ", email=" + email + ", sex="
				+ sex + ", password=" + password + "]";
	}



	
	
	
}
