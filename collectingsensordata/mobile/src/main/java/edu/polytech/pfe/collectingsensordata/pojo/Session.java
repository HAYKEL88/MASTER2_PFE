package edu.polytech.pfe.collectingsensordata.pojo;


import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;


public class Session {

    public static User user = new User();
    public static Admin admin = new Admin();

	public static String dateBegin;
	public static String dateEnd;
	
	public Session() {
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		Date date = new Date();
		dateBegin = dateFormat.format(date);
	}
	
	
	public static User getUser() {
		return user;
	}
	public static void setUser(User user) {
		Session.user = user;
	}
	public static String getDateBegin() {
		return dateBegin;
	}
	public static void setDateBegin(String dateBegin) {
		Session.dateBegin = dateBegin;
	}
	public static String getDateEnd() {
		return dateEnd;
	}
	public static void setDateEnd(String dateEnd) {
		Session.dateEnd = dateEnd;
	}

    public static Admin getAdmin() {
        return admin;
    }

    public static void setAdmin(Admin admin) {
        Session.admin = admin;
    }
}
