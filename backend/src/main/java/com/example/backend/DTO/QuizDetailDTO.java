package com.example.backend.DTO;

import com.example.backend.model.Difficulty;

public record QuizDetailDTO(String name, int numberOfQuestions, Difficulty difficulty) {
}

