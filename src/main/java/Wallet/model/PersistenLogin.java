package Wallet.model;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity(name="persistent_logins")
public class PersistenLogin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(columnDefinition = "VARCHAR(255)")
    @NotNull
    private String username;

    @Column(columnDefinition = "VARCHAR(255)")
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String series;

    @Column(columnDefinition = "VARCHAR(255)")
    @NotNull
    private String token;

    @Column(columnDefinition = "VARCHAR(255)")
    @NotNull
    private Timestamp last_used;
}
