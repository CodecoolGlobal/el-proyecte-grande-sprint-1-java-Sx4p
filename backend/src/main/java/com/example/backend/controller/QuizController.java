package com.example.backend.controller;

import com.example.backend.DTO.QuizDetail;
import com.example.backend.model.Quiz;
import com.example.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Quiz getQuizById(@PathVariable int id) {
        return quizService.getQuizById(id);
    }

    @PostMapping("/")
    public Quiz createQuiz(@RequestBody Quiz quiz) {
        return quizService.createQuiz(quiz);
    }

    @DeleteMapping("/{id}")
    public boolean deleteQuizById(@PathVariable int id) {
        return quizService.deleteQuizById(id);
    }

    @GetMapping("/all/details")
    public Set<QuizDetail> getDetailsOfQuizzes () {
        return quizService.getQuizzesDetails();
    }

}
