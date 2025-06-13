package com.javatpoint.controller;

import com.javatpoint.dto.QuestionDTO;
import com.javatpoint.dto.UserDTO;
import com.javatpoint.model.Comment;
import com.javatpoint.model.Question;
import com.javatpoint.model.User;
import com.javatpoint.service.MapStructMapper;
import com.javatpoint.service.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin

public class QuestionController {

    private QuestionRepository questionRepository;
    private MapStructMapper mapper;
    private static String UPLOAD_DIRECTORY=System.getProperty("user.dir")+"\\images\\";

    @Autowired
    public QuestionController(QuestionRepository questionRepository,MapStructMapper mapper) {
        this.questionRepository = questionRepository;
        this.mapper=mapper;
    }
//    @GetMapping("/api/questions")
//    public List<Question> getQuestions(){
//        return questionRepository.findAll();
//    }

    @GetMapping("/getAllQuestions")
    public ResponseEntity<List<Question>> getQuestions2(){
        try{
            List<Question> questions=new ArrayList<>();
            questionRepository.findAll().forEach(e->questions.add((e)));
        return new ResponseEntity<>(questions,HttpStatus.OK); }
        catch (Exception e)
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getQuestionById/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable long id){
        Question q=questionRepository.findById(id).orElse(null);
                if(q!=null)
                    return  new ResponseEntity<>(q,HttpStatus.OK);
                else{
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
    }

    @GetMapping("/getQuestionByUserId/{userId}")
    public ResponseEntity<List<Question>> getQuestionByUserId(@PathVariable long userId) {
        try {
            List<Question> questions = questionRepository.findAllByUserId(userId); // שינוי בשם המתודה
            return new ResponseEntity<>(questions, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getQuestionByCategoryId/{id}")
    public ResponseEntity<List<Question>> findAllByCategory(@PathVariable("id") long CategoryId){
        List<Question> questions = questionRepository.findAllByCategoryId(CategoryId);

        if (questions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(questions, HttpStatus.OK);
        }
    }


    @PostMapping("/createQuestion")
    public ResponseEntity<Question> createQuestion(@RequestBody Question q){
        try{
            Question newQuestion=questionRepository.save(q);
            return new ResponseEntity<>(newQuestion,HttpStatus.CREATED);
        }
        catch (Exception e){
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PostMapping("/uploadQuestion")
    public ResponseEntity<QuestionDTO> uploadQuestionWithImage(@RequestPart("image") MultipartFile file,
                                                  @RequestPart("question") QuestionDTO q) throws IOException {
        try {
        String filePath=UPLOAD_DIRECTORY + file.getOriginalFilename();
            Path fileName = Paths.get(filePath);
            Files.write(fileName, file.getBytes());
            q.setImagePath(filePath);
            Question newQuestion=questionRepository.save(mapper.dtoToQuestion(q));
            return  new ResponseEntity<>(mapper.questionToDTO(newQuestion),HttpStatus.CREATED);
        }
        catch (Exception e){
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }



    @GetMapping("/getDto/{id}")
    public ResponseEntity <QuestionDTO> getDTO(@PathVariable long id) throws IOException {

        Question q = questionRepository.findById(id).orElse(null);
        if (q != null) {
            return new ResponseEntity<>(mapper.questionToDTO(q), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

//    @GetMapping("/getQuestiondto/{id}")
//    public ResponseEntity<QuestionDTO> getDTO(@PathVariable long id) throws IOException {
//        Question q=questionRepository.findById(id).orElse(null);
//        if(q!=null){
//            return  new ResponseEntity<>(mapper.questionToDTO(q),HttpStatus.OK);
//        }
//        else{
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        }
//
//    }


//    @PutMapping("/update/{id}")
//    public ResponseEntity<Question> updateQuestion(@PathVariable long id,@RequestBody Question question){
//        Question q=questionRepository.findById(id).orElse(null);
//        if(question!=null){
//            q.setCategory(question.getCategory());
//            q.setDateUpload(question.getDateUpload());
//            q.setText(question.getText());
//            questionRepository.save(q);
//            return new ResponseEntity<>(q,HttpStatus.OK);
//        }
//        else{
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity deleteQuestion(@PathVariable long id){
//        try{
//            questionRepository.deleteById(id);
//            return new ResponseEntity(HttpStatus.NO_CONTENT);
//        }
//        catch (Exception e){
//            System.out.println(e);
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
}
