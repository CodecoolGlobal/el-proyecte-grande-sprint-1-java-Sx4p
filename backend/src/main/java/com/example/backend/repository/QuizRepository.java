package com.example.backend.repository;

import com.example.backend.DTO.QuizDetail;
import com.example.backend.model.Answer;
import com.example.backend.model.Difficulty;
import com.example.backend.model.Question;
import com.example.backend.model.Quiz;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Repository
public class QuizRepository {
    private final Set<Quiz> quizzes = new HashSet<>(Set.of(new Quiz(1, 25, "JS Basics", new HashSet<>(
                    Set.of(new Question(11, "Which are the primitive types in JavaScript?",
                                    Set.of(new Answer(111, "number, string, boolean, undefined, null, symbol, bigInt", true),
                                            new Answer(112, "number, string, boolean, undefined, null, symbol", false),
                                            new Answer(113, "number, boolean, undefined, null, symbol, bigInt", false),
                                            new Answer(114, "number, string, boolean, undefined, null, symbol, array", false))
                            ),
                            new Question(12, "How can you access the first and the last item of an array?",
                                    Set.of(new Answer(121, "first: Array[0] - last: Array[array.length-1]", true),
                                            new Answer(122, "first: Array[1] - last: Array[array.length]", false),
                                            new Answer(123, "first: Array[0] - last: Array[array-1]", false),
                                            new Answer(124, "first: Array[1] - last: Array[array.length-2]", false))
                            ),
                            new Question(13, "Which builtin function is regarding strings.",
                                    Set.of(new Answer(131, ".split()", true),
                                            new Answer(132, ".splice()", false),
                                            new Answer(133, ".toString()", false),
                                            new Answer(134, ".map()", false)))
                    )), LocalDate.of(2023, 8, 1), Difficulty.EASY),

            new Quiz(2, 26, "Movies", new HashSet<>(
                    Set.of(new Question(21, "Which film has a highest rate on IMDB?",
                                    Set.of(new Answer(211, "The Shawshank Redemption", true),
                                            new Answer(212, "The Godfather", false),
                                            new Answer(213, "Barbie", false),
                                            new Answer(214, "Pulp Fiction", false))),
                            new Question(22, "In the film Inception, what is the term used to describe " +
                                    "the device that allows characters to enter another person's dreams?",
                                    Set.of(new Answer(221, "Dreamscope", false),
                                            new Answer(222, "Mindwalk", false),
                                            new Answer(223, "Oneiricon", false),
                                            new Answer(224, "PASIV Device", true))),
                            new Question(23, "What year saw the release of the superhero film Black Panther," +
                                    " which featured the fictional African nation of Wakanda and became a significant cultural milestone?",
                                    Set.of(new Answer(231, "2015", false),
                                            new Answer(232, "2017", false),
                                            new Answer(233, "2018", true),
                                            new Answer(234, "2019", false)))
                    )), LocalDate.of(2023, 8, 15), Difficulty.MEDIUM))
    );

    public Quiz getQuizById(int id) {
        Optional<Quiz> optionalQuiz = quizzes.stream().filter(quiz -> quiz.id() == id).findFirst();
        return optionalQuiz.orElse(null);
    }

    public Quiz createQuiz(Quiz quiz) {
        quizzes.add(quiz);
        return quiz;
    }

    public boolean deleteQuizById(int id) {
        return quizzes.remove(getQuizById(id));
    }

    public Set<QuizDetail> getQuizzesDetails() {
        return quizzes.stream()
                .map(quiz -> new QuizDetail(quiz.name(), quiz.questions().size(), quiz.difficulty()))
                .collect(Collectors.toSet());
    }

    public Set<QuizDetail> getQuizzesDetailsOfUserById(int id) {
        return quizzes.stream().filter(quiz -> quiz.userId() == id)
                .map(quiz -> new QuizDetail(quiz.name(), quiz.questions().size(), quiz.difficulty()))
                .collect(Collectors.toSet());
    }

    public Question createQuestionToQuizById(int id, Question question) {
        Quiz quiz = getQuizById(id);
        quiz.questions().add(question);
        return question;
    }

    public boolean deleteQuestionByIdFromQuiz(int quizId, int questionId) {
        Quiz quiz = getQuizById(quizId);
        return quiz.questions().remove(getQuestionById(quiz, questionId));
    }

    private Question getQuestionById(Quiz quiz, int id) {
        Optional<Question> optionalQuestion = quiz.questions().stream().filter(question -> question.id() == id).findFirst();
        return optionalQuestion.orElse(null);
    }
}
