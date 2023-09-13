package com.quizbuzz.backend.DTO;

import com.quizbuzz.backend.model.Difficulty;

public record QuizDetailDTO(Long id, String name, int numberOfQuestions, Difficulty difficulty) {
}

