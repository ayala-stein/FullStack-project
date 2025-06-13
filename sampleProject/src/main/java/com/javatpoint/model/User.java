package com.javatpoint.model;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;
import javax.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String password;
    private String mail;
    private String firstName;
    private String lastName;
    private String image;

    @JsonIgnore
    @OneToMany(mappedBy = "user" )
    private List<Comment> comments;

    @JsonIgnore
    @OneToMany(mappedBy = "user" )
    private List<Question> questions;

    public User(Long id, String password, String mail, String firstName, String lastName, List<Comment> comments, List<Question> questions,String image) {
        this.id = id
        ;
        this.password = password;
        this.mail = mail;
        this.firstName = firstName;
        this.lastName = lastName;
        this.comments = comments;
        this.questions = questions;
        this.image=image;
    }

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
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

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public String getImage() { return image; }

    public void setImage(String image) { this.image = image; }
}
