package com.ty.voyogo.security;


import com.ty.voyogo.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.*;

@Service
public class JwtService {

    @Value(value = "${jwt.secret}")
    private  String jwtSecret ;
    @Value(value = "${jwt.expiry_time}")
    private Long expriy;

    private SecretKey signingKey() {
        return Keys.hmacShaKeyFor( Base64.getDecoder().decode(jwtSecret));
    }

    public String generateToken(User user){
        Map<String , Object> claims=new HashMap<>();
        claims.put("role",user.getRole());

        Date now=new Date();
        Date expiry=new Date(now.getTime()+expriy);


        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getEmail())
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(signingKey(), SignatureAlgorithm.HS256)
                .compact();

    }
    public boolean validateToken(String token){
        try{
            Jwts.parserBuilder()
                    .setSigningKey(signingKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Claims extractAllClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(signingKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

    }
    public String extractUserName(String token){
        return Jwts.parserBuilder()
                .setSigningKey(signingKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String extractRoles(String token){
        Claims claims= Jwts.parserBuilder()
                .setSigningKey(signingKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.get("role").toString();
    }
}