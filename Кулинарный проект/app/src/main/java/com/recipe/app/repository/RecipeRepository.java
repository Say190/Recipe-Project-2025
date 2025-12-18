package com.recipe.app.repository;

import com.recipe.app.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    // Это позволит искать рецепты по названию, как просят в задании
    List<Recipe> findByTitleContainingIgnoreCase(String title);
}
