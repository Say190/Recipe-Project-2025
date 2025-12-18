package com.recipe.app.service;

import com.recipe.app.entity.Recipe;
import com.recipe.app.repository.RecipeRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    // Получить все рецепты (для главной страницы)
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    // Сохранить новый рецепт
    public Recipe createRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    // Поиск по названию (для реализации поиска из ТЗ)
    public List<Recipe> searchByTitle(String title) {
        return recipeRepository.findByTitleContainingIgnoreCase(title);
    }
}
