package Wallet.model;


import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.Date;

@Entity(name="users")
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(columnDefinition = "VARCHAR(255)")
    @NotNull
    private String role;
    @Column(columnDefinition = "DATETIME")
    @NotNull
    private Date reg_time;
    @Column(columnDefinition = "VARCHAR(255)")
    @NotNull
    private String username;
    @Column(columnDefinition = "VARCHAR(255)")
    @NotNull
    private String email;
    @Column(columnDefinition = "VARCHAR(255)")
    @NotNull
    private String password;
    @Column(columnDefinition = "VARCHAR(255)")
    private String code;
    @Column(columnDefinition = "TEXT")
    private String photo;
    private int enabled;
    @Column(columnDefinition = "TINYINT")

    public int getId() {
        return id;
    }

    public User setId(int id) {
        this.id = id;
        return null;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Date getReg_time() {
        return reg_time;
    }

    public void setReg_time(Date reg_time) {
        this.reg_time = reg_time;
    }

    public String getName() {
        return username;
    }

    public void setName(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }
}