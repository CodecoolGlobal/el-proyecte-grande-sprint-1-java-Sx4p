package com.example.backend.service;

import com.example.backend.DTO.QuizDetail;
import com.example.backend.model.Question;
import com.example.backend.model.Quiz;
import com.example.backend.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class QuizService {

    private final QuizRepository quizRepository;

    @Autowired
    public QuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public Quiz getQuizById(int id) {
        return quizRepository.getQuizById(id);
    }

    public Quiz createQuiz(Quiz quiz) {
        return quizRepository.createQuiz(quiz);
    }

    public boolean deleteQuizById(int id) {
        return quizRepository.deleteQuizById(id);
    }

    public Set<QuizDetail> getQuizzesDetails() {
        return quizRepository.getQuizzesDetails();
    }

    public Question createQuestionToQuizById(int id, Question question) {
        return quizRepository.createQuestionToQuizById(id, question);
    }

    public boolean deleteQuestionByIdFromQuiz(int quizId, int questionId) {
        return quizRepository.deleteQuestionByIdFromQuiz(quizId, questionId);
    }
}
