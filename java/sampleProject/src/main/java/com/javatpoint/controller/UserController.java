package com.javatpoint.controller;

import com.javatpoint.dto.QuestionDTO;
import com.javatpoint.dto.UserDTO;
import com.javatpoint.model.Question;
import com.javatpoint.model.User;
import com.javatpoint.service.MapStructMapper;
import com.javatpoint.service.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.ws.http.HTTPBinding;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin

public class UserController {
    private UserRepository userRepository;
    private MapStructMapper mapper;
    private static String UPLOAD_DIRECTORY=System.getProperty("user.dir")+"\\images\\";

    @Autowired
    public UserController(UserRepository userRepository,MapStructMapper mapper) {
        this.userRepository = userRepository;
        this.mapper=mapper;
    }

//    @GetMapping("/getUsers")
//    public List<User> getUsers(){
//        return userRepository.findAll();
//    }


//    @GetMapping("/getAllUser")
//    public ResponseEntity<List<UserDTO>> usersToDTO(){
//        try{
//            List<User> users=new ArrayList<>();
//            userRepository.findAll().forEach(e->users.add((e)));
//            return new ResponseEntity<>(mapper.usersToDTO(users), HttpStatus.OK);
//        }
//        catch (Exception e)
//        {
//            System.out.println(e);
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }






    @GetMapping("/getAllUser")
    public ResponseEntity<List<User>> getAllUser(){
        try{
            List<User> users=new ArrayList<>();
            userRepository.findAll().forEach(e->users.add((e)));
            return new ResponseEntity<>(users, HttpStatus.OK);
        }
        catch (Exception e)
        {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/getUserDetails/{id}")
    public ResponseEntity<User> getUserById(@PathVariable long id){
        User u=userRepository.findById(id).orElse(null);
        if(u!=null)
            return  new ResponseEntity<>(u,HttpStatus.OK);
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



//    @PostMapping("/createNewUser")
//    public ResponseEntity<User> createUser(@RequestBody User u){
//        try{
//            User newUser=userRepository.save(u);
//            return new ResponseEntity<>(newUser,HttpStatus.CREATED);
//        }
//        catch (Exception e){
//            System.out.println(e);
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

//    @PostMapping("/uploadUser")
//    public ResponseEntity<User> uploadUserWithImage(@RequestPart("image") MultipartFile file,
//                                                            @RequestPart("user") UserDTO u) throws IOException {
//        try {
//            String filePath=UPLOAD_DIRECTORY + file.getOriginalFilename();
//            Path fileName = Paths.get(filePath);
//            Files.write(fileName, file.getBytes());
//            u.setImagePath(filePath);
//            User newUser=userRepository.save(mapper.dtoToUser(u));
//            return  new ResponseEntity<>(newUser,HttpStatus.CREATED);
//        }
//        catch (Exception e){
//            System.out.println(e);
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//
//    }

    @GetMapping("/getDto/{id}")
    public ResponseEntity <UserDTO> getDTO(@PathVariable long id) throws IOException {
        try{
        User u = userRepository.findById(id).orElse(null);
        if (u != null) {
            return new ResponseEntity<>(mapper.userToDTO(u), HttpStatus.OK);
        }
        }
        catch (Exception e)
        {
            System.out.println(e);

        return new ResponseEntity<>(HttpStatus.NOT_FOUND); }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

    }










//
//    @GetMapping("/getUserDetailsByMail")
//    public ResponseEntity<User> getUserByMail(@PathVariable String mail,@PathVariable String password)
//    {
//        User u=userRepository.findByMail(mail);
//        if(u==null)
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        else if(!password.equals(u.getPassword()))
//            return new ResponseEntity<>(HttpStatus.PARTIAL_CONTENT);
//        else
//            return new ResponseEntity<>(u,HttpStatus.CREATED);
//    }

    @PostMapping("/signIn")
    public ResponseEntity userSignIn(@RequestBody User u) throws IOException {
        User u1=userRepository.findByMail(u.getMail());
        if(u1!=null&&u1.getPassword().equals(u.getPassword()))
            return new ResponseEntity(mapper.userToDTO(u1),HttpStatus.OK);
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }







    @PostMapping("/signUp")
    public ResponseEntity userSignUp(@RequestBody User u){
        User u1=userRepository.findByMail(u.getMail());
        if(u1==null){
//            try{
                User newUser=userRepository.save(u);
                return new ResponseEntity<>(newUser,HttpStatus.CREATED);
//            }
//            catch (Exception e){
//                System.out.println(e);
//                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//            }
            }
        else
            return new ResponseEntity(null,HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @PostMapping("/signUpWithImage")
    public ResponseEntity<UserDTO> uploadUserWithImage(@RequestPart("image") MultipartFile file,
                                                    @RequestPart("user") UserDTO u) throws IOException {
        User u1=userRepository.findByMail(u.getMail());
        if(u1==null){
//        try {
            String filePath=UPLOAD_DIRECTORY + file.getOriginalFilename();
            Path fileName = Paths.get(filePath);
            Files.write(fileName, file.getBytes());
            u.setImagePath(filePath);
            User newUser=userRepository.save(mapper.dtoToUser(u));
            return  new ResponseEntity<>(mapper.userToDTO(newUser),HttpStatus.CREATED);
//        }
//        catch (Exception e){
//            System.out.println(e);
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
        }
        else
            return new ResponseEntity(HttpStatus.LOCKED);
    }


    }



//    @PostMapping("/uploadRout")
//    public ResponseEntity <Rout>uploadRoutImage(@RequestPart("image") MultipartFile file,
//                                                @RequestPart("rout") Rout r) throws  IOException {
//        try {
//            String filePath = UPLOAD_DIRECTORY + file.getOriginalFilename();
//            Path filename = Paths.get(filePath);
//            Files.write(filename, file.getBytes());
//            r.setImage(filePath);
//            Rout newRout= routRepository.save(r);
//            return new ResponseEntity(newRout, HttpStatus.CREATED);
//        }
//        catch(Exception e){
//            System.out.println("-----------------------"+e+"-----------------------");
//            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
