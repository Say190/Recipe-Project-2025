package com.recipe.app.entity; // Используем ваш пакет entity

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "recipes") // Явно указываем имя таблицы
@Data
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    @Lob
    private String ingredients;
    @Lob
    private String instructions;
    private String category;
    private LocalDateTime createdAt = LocalDateTime.now();
    private boolean isPublic = true;
}
