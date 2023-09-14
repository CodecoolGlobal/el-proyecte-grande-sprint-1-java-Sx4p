package com.quizbuzz.backend.service;

import com.quizbuzz.backend.DTO.QuizDetailDTO;
import com.quizbuzz.backend.model.Question;
import com.quizbuzz.backend.model.Quiz;
import com.quizbuzz.backend.model.user.AppUser;
import com.quizbuzz.backend.repository.QuestionRepository;
import com.quizbuzz.backend.repository.QuizDetail;
import com.quizbuzz.backend.repository.QuizRepository;
import com.quizbuzz.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.naming.NoPermissionException;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    @Autowired
    public QuizService(QuizRepository quizRepository, QuestionRepository questionRepository, UserRepository userRepository) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
    }

    public Quiz getQuizById(Long id) {
        return quizRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public Quiz createQuiz(Quiz quiz) {
        Long actualUserId = getLoggedInUserId();
        quiz.setUserId(actualUserId);
        return quizRepository.save(quiz);
    }

    @Transactional
    public Quiz updateQuizById(Long id, Quiz quiz) throws NoPermissionException {
        Quiz quizToEdit = quizRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        Long actualUserId = getLoggedInUserId();
        if (quizToEdit.getUserId().equals(actualUserId)) {
            quizToEdit.setName(quiz.getName());
            quizToEdit.setDifficulty(quiz.getDifficulty());
            handleQuestions(quizToEdit.getQuestions(), quiz.getQuestions());
            quizToEdit.setQuestions(quiz.getQuestions());
            quizRepository.save(quizToEdit);
            return quizToEdit;
        } else {
            throw new NoPermissionException("No permission to edit quiz!");
        }
    }

    @Transactional
    public boolean deleteQuizById(Long id) throws NoPermissionException {
        Long actualUserId = getLoggedInUserId();
        Quiz quizToDelete = quizRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        if (quizToDelete.getUserId().equals(actualUserId)) {
            quizRepository.delete(quizToDelete);
            return true;
        } else {
            throw new NoPermissionException("No permission to delete quiz!");
        }
    }

    public Set<QuizDetailDTO> getQuizzesDetails() {
        Set<QuizDetail> quizDetails = quizRepository.getQuizDetails();
        return quizDetails.stream()
                .map(quizDetail -> new QuizDetailDTO(
                        quizDetail.getId(),
                        quizDetail.getName(),
                        quizDetail.getNumberOfQuestions(),
                        quizDetail.getDifficulty()))
                .collect(Collectors.toSet());
    }

    public Set<QuizDetailDTO> getQuizzesDetailsOfUserById() {
        Long actualUserId = getLoggedInUserId();
        Set<QuizDetail> quizDetailsByUser = quizRepository.getQuizDetailsByUserId(actualUserId);
        return quizDetailsByUser.stream()
                .map(quizDetail -> new QuizDetailDTO(
                        quizDetail.getId(),
                        quizDetail.getName(),
                        quizDetail.getNumberOfQuestions(),
                        quizDetail.getDifficulty()))
                .collect(Collectors.toSet());
    }

    private Long getLoggedInUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        Optional<AppUser> actualUser = userRepository.findByUserName(userName);
        return actualUser.map(AppUser::getId).orElse(null);
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
