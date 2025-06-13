package com.javatpoint.service;


import com.javatpoint.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;

//@Component
public interface QuestionRepository extends JpaRepository<Question,Long> {

    List<Question> findAllByCategoryId(long id);
    List<Question> findAllByUserId(long id);



}

