package com.javatpoint.service;

import com.javatpoint.model.Comment;
import com.javatpoint.model.Question;
import com.javatpoint.model.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;

//@Component
public interface CommentRepository extends JpaRepository<Comment,Long> {


    List<Comment> findAllByScore(int score);
    List<Comment> findAllByQuestionId(Long questionId);
    List<Comment> findAllByUserId(Long userId);


}
