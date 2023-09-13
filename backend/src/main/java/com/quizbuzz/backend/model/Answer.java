package com.quizbuzz.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String answer;

    @Column(nullable = false)
    private boolean rightAnswer;

    @JsonBackReference
    @ManyToOne
    private Question question;
}
