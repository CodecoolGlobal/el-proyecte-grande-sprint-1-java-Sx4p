package com.quizbuzz.backend.controller;

import com.quizbuzz.backend.DTO.QuizDetailDTO;
import com.quizbuzz.backend.model.Quiz;
import com.quizbuzz.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("api/quiz")
public class QuizController {

    private final QuizService quizService;

    @Autowired
    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(quizService.getQuizById(id));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(404).build();
        }
    }

    @PostMapping("/")
    public Quiz createQuiz(@RequestBody Quiz quiz) {
        return quizService.createQuiz(quiz);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteQuizById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(quizService.deleteQuizById(id));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(404).build();
        }
    }

    @GetMapping("/all/details")
    public Set<QuizDetailDTO> getDetailsOfQuizzes() {
        return quizService.getQuizzesDetails();
    }

    @GetMapping("/all/details/my/")
    public Set<QuizDetailDTO> getQuizzesDetailsOfUserById() {
        return quizService.getQuizzesDetailsOfUserById();
    }

    @PutMapping("/{id}")
    public Quiz updateQuizById(@PathVariable Long id, @RequestBody Quiz quiz) {
        return quizService.updateQuizById(id, quiz);
    }
}
