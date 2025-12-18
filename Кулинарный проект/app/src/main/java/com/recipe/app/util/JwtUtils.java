package com.recipe.app.util;

import com.recipe.app.entity.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    // Секретный ключ для подписи токена.
    // В реальном приложении его берут из application.properties
    @Value("${app.jwtSecret:YourSuperSecretKeyForKursachProjectCanBeLonger}")
    private String jwtSecret;

    // Срок действия токена (24 часа)
    @Value("${app.jwtExpirationMs:86400000}")
    private int jwtExpirationMs;

    // Метод для генерации токена
    public String generateJwtToken(User userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("role", userDetails.getRole()) // Добавляем роль в токен
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    // Метод для получения имени пользователя из токена
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    // Метод для валидации токена
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
            return true;
        } catch (MalformedJwtException e) {
            // log("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            // log("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            // log("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            // log("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }
}
