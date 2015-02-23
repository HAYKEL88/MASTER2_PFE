package edu.polytech.pfe.collectingsensordata.pojo;

/**
 * Created by Haykel on 22/02/2015.
 */
public class Rule {

    public String id;
    public String name;
    public String description;
    public String formula;
    public String admin_email;

    public Rule()
    {

    }

    public Rule(String id, String name, String description, String formula, String admin_email) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.formula = formula;
        this.admin_email = admin_email;
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

    public String getFormula() {
        return formula;
    }

    public String getAdmin_email() {
        return admin_email;
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

    public void setFormula(String formula) {
        this.formula = formula;
    }

    public void setAdmin_email(String admin_email) {
        this.admin_email = admin_email;
    }


    @Override
    public String toString() {
        return "Rule{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", formula='" + formula + '\'' +
                ", admin_email='" + admin_email + '\'' +
                '}';
    }
}
