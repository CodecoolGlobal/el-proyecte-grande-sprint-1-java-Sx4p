package com.example.backend.service;

import com.example.backend.DTO.QuizDetailDTO;
import com.example.backend.DTO.QuizUpdateNameAndDifficultyDTO;
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
    public Quiz updateQuizById(Long id, QuizUpdateNameAndDifficultyDTO quizUpdate) {
        Quiz quizToEdit = quizRepository.getReferenceById(id);
        quizToEdit.setName(quizUpdate.name());
        quizToEdit.setDifficulty(quizUpdate.difficulty());
        quizRepository.save(quizToEdit);
        return quizToEdit;
    }

    @Transactional
    public Question createQuestionToQuizById(Long id, Question question) {
        Quiz quiz = quizRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        question.setQuiz(quiz);
        questionRepository.save(question);
        return question;
    }

    @Transactional
    public boolean deleteQuestionByIdFromQuiz(Long questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow(EntityNotFoundException::new);
        questionRepository.delete(question);
        return true;
    }
}
