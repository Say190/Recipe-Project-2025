package com.recipe.app.service;

import com.recipe.app.dto.JwtResponse;
import com.recipe.app.dto.LoginRequest;
import com.recipe.app.dto.RegisterRequest;
import com.recipe.app.entity.User;
import com.recipe.app.repository.UserRepository;
import com.recipe.app.util.JwtUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    // Конструктор для внедрения зависимостей (Autowired через конструктор)
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    // Метод для регистрации нового пользователя
    public boolean registerUser(RegisterRequest registerRequest) {
        // Проверяем, существует ли уже пользователь с таким именем или email
        if (userRepository.findByUsername(registerRequest.getUsername()).isPresent() ||
                userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            return false; // Пользователь уже есть
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        // Шифруем пароль с использованием BCrypt перед сохранением в БД
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole("ROLE_USER"); // Устанавливаем роль по умолчанию

        userRepository.save(user);
        return true; // Пользователь успешно зарегистрирован
    }

    // Метод для аутентификации пользователя (входа в систему)
    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElse(null);

        // Проверяем существование пользователя и совпадение пароля (сравниваем
        // зашифрованные версии)
        if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            // Если учетные данные верны, генерируем JWT-токен
            String jwt = jwtUtils.generateJwtToken(user);
            // Возвращаем ответ с токеном и данными пользователя
            return new JwtResponse(jwt, user.getId(), user.getUsername(), user.getRole());
        } else {
            return null; // Неверный логин или пароль
        }
    }
}
