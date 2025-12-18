package com.recipe.app.controller;

import com.recipe.app.dto.JwtResponse;
import com.recipe.app.dto.LoginRequest;
import com.recipe.app.dto.RegisterRequest;
import com.recipe.app.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        JwtResponse jwtResponse = authService.authenticateUser(loginRequest);
        if (jwtResponse == null) {
            return ResponseEntity.badRequest().body("Error: Invalid username or password");
        }
        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        if (authService.registerUser(registerRequest)) {
            return ResponseEntity.ok("User registered successfully!");
        } else {
            return ResponseEntity.badRequest().body("Error: Username or email is already taken!");
        }
    }
}
