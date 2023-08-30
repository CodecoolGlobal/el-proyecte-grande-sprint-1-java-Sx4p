package com.example.backend.DTO;

import com.example.backend.model.Difficulty;

public record QuizUpdateNameAndDifficultyDTO(String name, Difficulty difficulty) {
}
