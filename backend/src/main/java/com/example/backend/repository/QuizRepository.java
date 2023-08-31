package com.example.backend.repository;

import com.example.backend.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {

    @Query(value = "SELECT q.id as id, q.name AS name, COUNT(qst) AS numberOfQuestions, q.difficulty AS difficulty " +
            "FROM Quiz q LEFT JOIN q.questions qst GROUP BY q.id")
    Set<QuizDetail> getQuizDetails();

}
