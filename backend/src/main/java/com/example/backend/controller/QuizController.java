package com.example.backend.controller;

import com.example.backend.DTO.QuizDetailDTO;
import com.example.backend.DTO.QuizUpdateNameAndDifficultyDTO;
import com.example.backend.model.Question;
import com.example.backend.model.Quiz;
import com.example.backend.service.QuizService;
import jakarta.persistence.EntityNotFoundException;
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

    @GetMapping("/all/details/my/{id}") //TODO
    public Set<QuizDetailDTO> getQuizzesDetailsOfUserById(@PathVariable Long id) {
        return quizService.getQuizzesDetailsOfUserById(id);
    }

    @PutMapping("/{id}")
    public Quiz updateQuizById(@PathVariable Long id, @RequestBody QuizUpdateNameAndDifficultyDTO quizUpdate) {
        return quizService.updateQuizById(id, quizUpdate);
    }

    @PostMapping("/{id}/question")
    public ResponseEntity<Question> addQuestionToQuizById(@PathVariable Long id, @RequestBody Question question) {
        try {
            return ResponseEntity.ok(quizService.createQuestionToQuizById(id, question));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(404).build();
        }
    }

    @DeleteMapping("/question/{id}")
    public ResponseEntity<Boolean> deleteQuestionByIdFromQuizById(@PathVariable("id") Long questionId) {
        try {
            return ResponseEntity.ok(quizService.deleteQuestionByIdFromQuiz(questionId));
        } catch (EntityNotFoundException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(404).build();
        }
    }

}
