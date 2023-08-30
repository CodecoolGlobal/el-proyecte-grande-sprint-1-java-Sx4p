package com.example.backend.service;

import com.example.backend.DTO.QuizDetailDTO;
import com.example.backend.model.Question;
import com.example.backend.model.Quiz;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.repository.QuizDetail;
import com.example.backend.repository.QuizRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;

    @Autowired
    public QuizService(QuizRepository quizRepository, QuestionRepository questionRepository) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
    }

    public Quiz getQuizById(Long id) {
        return quizRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public Quiz createQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    @Transactional
    public boolean deleteQuizById(Long id) {
        Quiz quizToDelete = quizRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        quizRepository.delete(quizToDelete);
        return true;
    }

    public Set<QuizDetailDTO> getQuizzesDetails() {
        Set<QuizDetail> quizDetails = quizRepository.getQuizDetails();
        return quizDetails.stream()
                .map(quizDetail -> new QuizDetailDTO(
                        quizDetail.getName(),
                        quizDetail.getNumberOfQuestions(),
                        quizDetail.getDifficulty()))
                .collect(Collectors.toSet());
    }

    public Set<QuizDetailDTO> getQuizzesDetailsOfUserById(Long id) {
        //TODO
        return null;
    }

    @Transactional
    public Quiz updateQuizById(Long id, Quiz quiz) {
        Quiz quizToEdit = quizRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        quizToEdit.setName(quiz.getName());
        quizToEdit.setDifficulty(quiz.getDifficulty());
        handleQuestions(quizToEdit.getQuestions(), quiz.getQuestions());
        quizToEdit.setQuestions(quiz.getQuestions());
        quizRepository.save(quizToEdit);
        return quizToEdit;
    }

    private void handleQuestions(Set<Question> existingQuestions, Set<Question> newQuestions) {
        Set<Question> questionsToSave = newQuestions.stream()
                .filter(question -> !existingQuestions.contains(question)).collect(Collectors.toSet());
        Set<Question> questionsToDelete = existingQuestions.stream()
                .filter(question -> !newQuestions.contains(question)).collect(Collectors.toSet());
        questionRepository.saveAll(questionsToSave);
        questionRepository.deleteAll(questionsToDelete);
    }
}
