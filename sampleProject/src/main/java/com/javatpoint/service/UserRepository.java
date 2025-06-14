package com.javatpoint.service;

import com.javatpoint.model.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface UserRepository extends JpaRepository<User,Long> {

    User findByMail(String mail);
//    List<User> findAllByStatus(int status);


}
