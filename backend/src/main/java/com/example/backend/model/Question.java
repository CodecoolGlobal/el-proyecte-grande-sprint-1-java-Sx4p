package com.example.backend.model;

import java.util.Set;

public record Question(int id, String question, Set<Answer> answers) {
}
