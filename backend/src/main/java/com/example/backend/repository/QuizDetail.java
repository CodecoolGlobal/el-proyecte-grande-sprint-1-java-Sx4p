package com.example.backend.repository;

import com.example.backend.model.Difficulty;

public interface QuizDetail {
    Long getId();
    String getName();
    int getNumberOfQuestions();
    Difficulty getDifficulty();
}
