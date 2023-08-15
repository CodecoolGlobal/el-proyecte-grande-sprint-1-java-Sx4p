package com.example.backend.model;

import java.time.LocalDate;
import java.util.Set;

public record Quiz(int id, int userId, String name, Set<Question> questions, LocalDate creationDate, Difficulty difficulty) {
}
