package com.javatpoint.service;

import com.javatpoint.dto.CommentDTO;
import com.javatpoint.dto.QuestionDTO;
import com.javatpoint.dto.UserDTO;
import com.javatpoint.model.Comment;
import com.javatpoint.model.Question;
import com.javatpoint.model.User;
import org.mapstruct.Mapper;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Mapper(componentModel = "spring")
public interface MapStructMapper {

    List<UserDTO> usersToDTO(List<User> users);

    default QuestionDTO questionToDTO(Question q) throws IOException {
       QuestionDTO questionDTO= new QuestionDTO();
       questionDTO.setId(q.getId());
       questionDTO.setCategory(q.getCategory());
       questionDTO.setText(q.getText());
       questionDTO.setDateUpload(q.getDateUpload());
       questionDTO.setUser(q.getUser());
        Path fileName= Paths.get(q.getImage());
        byte [] byteImage= Files.readAllBytes(fileName);
        questionDTO.setImage(Base64.getEncoder().encodeToString(byteImage));
        return questionDTO;
    }

    default Question dtoToQuestion(QuestionDTO q)throws IOException{
        Question question=new Question();

        question.setId(q.getId());
        question.setUser(q.getUser());
        question.setDateUpload(q.getDateUpload());
        question.setText(q.getText());
        question.setCategory(q.getCategory());
        question.setImage(q.getImagePath());
        question.setComments(q.getComments());

        return  question;
    }


    default CommentDTO commentToDTO(Comment c) throws IOException{
        CommentDTO commentDTO=new CommentDTO();
        commentDTO.setId(c.getId());
        commentDTO.setUser(c.getUser());
        commentDTO.setDate(c.getDate());
        commentDTO.setQuestion(c.getQuestion());
        commentDTO.setScore(c.getScore());

        Path fileName= Paths.get(c.getImage());
        byte [] byteImage= Files.readAllBytes(fileName);
        commentDTO.setImage(Base64.getEncoder().encodeToString(byteImage));

        return commentDTO;
    }

//    default QuestionDTO questionToDTO(Question q) throws IOException {
//        QuestionDTO questionDTO= new QuestionDTO();
//        questionDTO.setId(q.getId());
//        questionDTO.setCategory(q.getCategory());
//        questionDTO.setText(q.getText());
//        questionDTO.setDateUpload(q.getDateUpload());
//        questionDTO.setUser(q.getUser());
//        Path fileName= Paths.get(q.getImage());
//        byte [] byteImage= Files.readAllBytes(fileName);
//        questionDTO.setImage(Base64.getEncoder().encodeToString(byteImage));
//        return questionDTO;
//    }

    default Comment dtoToComment(CommentDTO c)throws IOException{
        Comment comment=new Comment();
        comment.setId(c.getId());
        comment.setUser(c.getUser());
        comment.setDate(c.getDate());
        comment.setQuestion(c.getQuestion());
        comment.setScore(c.getScore());

        comment.setImage(c.getImagePath());
        return  comment;
    }

//    default UserDTO userToDTO(User u) throws IOException {
//        UserDTO userDTO= new UserDTO();
//        userDTO.setId(u.getId());
//        userDTO.setMail(u.getMail());
//        userDTO.setFirstName(u.getFirstName());
//        userDTO.setLastName(u.getLastName());
//        userDTO.setPassword(u.getPassword());
//        userDTO.setComments(u.getComments());
//
//        Path fileName= Paths.get(u.getImage());
//        byte [] byteImage= Files.readAllBytes(fileName);
//        userDTO.setImage(Base64.getEncoder().encodeToString(byteImage));
//        return userDTO;
//    }



    default UserDTO userToDTO(User u) throws IOException {
        UserDTO userDTO= new UserDTO();
        userDTO.setId(u.getId());
        userDTO.setMail(u.getMail());
        userDTO.setFirstName(u.getFirstName());
        userDTO.setLastName(u.getLastName());
        userDTO.setPassword(u.getPassword());
        userDTO.setComments(u.getComments());

        Path fileName= Paths.get(u.getImage());
        byte [] byteImage= Files.readAllBytes(fileName);
        userDTO.setImage(Base64.getEncoder().encodeToString(byteImage));
        return userDTO;
    }

    default User dtoToUser(UserDTO u)throws IOException{
        User user=new User();
        user.setId(u.getId());
        user.setImage(u.getImagePath());
        user.setComments(u.getComments());
        user.setFirstName(u.getFirstName());
        user.setLastName(u.getLastName());
        user.setMail(u.getMail());
        user.setPassword(u.getPassword());
        user.setQuestions(u.getQuestions());

        return  user;
    }

}
