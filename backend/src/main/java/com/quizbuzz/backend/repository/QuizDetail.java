package com.quizbuzz.backend.repository;

import com.quizbuzz.backend.model.Difficulty;

public interface QuizDetail {
    Long getId();
    String getName();
    int getNumberOfQuestions();
    Difficulty getDifficulty();
}
