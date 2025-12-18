package com.recipe.app.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "recipes")
@Data
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Lob
    private String ingredients; // Список ингредиентов текстом

    @Lob
    private String instructions; // Инструкция по приготовлению

    private String category; // Категория блюда

    private LocalDateTime createdAt = LocalDateTime.now();

    private boolean isPublic = true;

    // ВАЖНО: Эта связь решает твою ошибку в консоли
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User author;
}
