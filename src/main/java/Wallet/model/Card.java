package Wallet.model;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.Date;

@Entity(name="cards")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(columnDefinition = "VARCHAR(25)", unique = true)
    @NotNull
    private String number;

    @Column(columnDefinition = "VARCHAR(25)")
    @NotNull
    private String date;

    @Column(columnDefinition = "VARCHAR(25)")
    @NotNull
    private String name;

    @Column(columnDefinition = "VARCHAR(25)")
    @NotNull
    private String type;

    @Column(columnDefinition = "INT")
    private int cash;

    @Column(columnDefinition = "DATETIME")
    private Date add_time;

    @Column(columnDefinition = "VARCHAR(25)")
    @NotNull
    private String user_name;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getCash() {
        return cash;
    }

    public void setCash(int cash) {
        this.cash = cash;
    }

    public Date getAdd_time() {
        return add_time;
    }

    public void setAdd_time(Date add_time) {
        this.add_time = add_time;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }
}
