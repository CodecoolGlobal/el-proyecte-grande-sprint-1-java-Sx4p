package com.example.backend.DTO;

import com.example.backend.model.Difficulty;

public record QuizDetail(String name, int numberOfQuestions, Difficulty difficulty) {
}
