package com.sap.server.auth;


import com.sap.server.config.CorsConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class SessionController {

    private final AuthenticationService authenticationService;


   // @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "Authorization", exposedHeaders = "Content-Type")
    @GetMapping("/session/{token}")
    public ResponseEntity<UserDetails> getUserFromToken(@PathVariable String token) {
        return authenticationService.getUserFromToken(token);
    }




}
