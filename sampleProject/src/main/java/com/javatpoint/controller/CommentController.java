package com.javatpoint.controller;

import com.javatpoint.dto.CommentDTO;
import com.javatpoint.dto.QuestionDTO;
import com.javatpoint.model.Comment;
import com.javatpoint.model.Question;
import com.javatpoint.service.CommentRepository;
import com.javatpoint.service.MapStructMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin

public class CommentController {
    private MapStructMapper mapper;
    private CommentRepository commentRepository;
    private static String UPLOAD_DIRECTORY=System.getProperty("user.dir")+"\\images\\";

    @Autowired
    public CommentController(CommentRepository commentRepository ,MapStructMapper mapper) {
        this.commentRepository = commentRepository;
        this.mapper=mapper;
    }

    @GetMapping("/getAllComments")
    public ResponseEntity<List<Comment>> getAllComments(){
        try{
            List<Comment> comments=new ArrayList<>();
            commentRepository.findAll().forEach(e->comments.add((e)));
            return new ResponseEntity<>(comments, HttpStatus.OK); }
        catch (Exception e)
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/getCommentByQuestionId/{id}")
    public ResponseEntity<List<Comment>> findAllByQuestion(@PathVariable("id") Long questionId){
        List<Comment> comments = commentRepository.findAllByQuestionId(questionId);

        if (comments.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(comments, HttpStatus.OK);
        }
    }

    @GetMapping("/getCommentByUserId/{id}")
    public ResponseEntity<List<Comment>> findAllByUser(@PathVariable("id") Long userId){
        List<Comment> comments = commentRepository.findAllByUserId(userId);

        if (comments.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(comments, HttpStatus.OK);
        }
    }

    @GetMapping("/getCommentByScore/{score}")
    public ResponseEntity<List<Comment>> findAllCommentsByScore(@PathVariable int score){
        List<Comment> comments = commentRepository.findAllByScore(score);

        if (comments.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(comments, HttpStatus.OK);
        }
    }


    @PostMapping("/createNewComment")
    public ResponseEntity<Comment> createComment(@RequestBody Comment c){
        try{
            Comment newComment=commentRepository.save(c);
            return new ResponseEntity<>(newComment,HttpStatus.CREATED);
        }
        catch (Exception e){
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/uploadComment")
    public ResponseEntity<CommentDTO> uploadCommentWithImage(@RequestPart("image") MultipartFile file,
                                                            @RequestPart("comment") CommentDTO c) throws IOException {
        try {
            String filePath=UPLOAD_DIRECTORY + file.getOriginalFilename();
            Path fileName = Paths.get(filePath);
            Files.write(fileName, file.getBytes());
            c.setImagePath(filePath);
            Comment newComment=commentRepository.save(mapper.dtoToComment(c));
            return  new ResponseEntity(mapper.commentToDTO(newComment),HttpStatus.CREATED);
        }
        catch (Exception e){
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    @GetMapping("/getdto/{id}")
    public ResponseEntity<CommentDTO> getDTO(@PathVariable long id) throws IOException {
        Comment c=commentRepository.findById(id).orElse(null);
        if(c!=null){
            return  new ResponseEntity<>(mapper.commentToDTO(c),HttpStatus.OK);
        }
        else{
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
    }



    @GetMapping("/getCommentsByQuestionId/{id}")
    public ResponseEntity<List<Comment>> findAllByQuestion(@PathVariable("id") long questionId){
        List<Comment> comments = commentRepository.findAllByQuestionId(questionId);

        if (comments.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(comments, HttpStatus.OK);
        }
    }


}
