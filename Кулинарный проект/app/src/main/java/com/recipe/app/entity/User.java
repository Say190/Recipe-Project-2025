package com.recipe.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // Хранит значения: "ADMIN" или "USER"

    // Связь с избранными рецептами (для реализации функции "добавлять в избранное")
    @ManyToMany
    @JoinTable(name = "user_favorites", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "recipe_id"))
    private List<Recipe> favorites;

    // Связь с рецептами, которые создал этот пользователь
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
    private List<Recipe> myRecipes;

    @Column(unique = true, nullable = false)
    private String email; // Добавь эту строку

}
