package com.sap.server.auth;

import com.sap.server.services.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody ResgisterRequest request
    ){
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) throws Exception {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }


    @GetMapping("/session/{token}")
    public ResponseEntity<UserDetails> getUserFromToken(@PathVariable String token) {
        return authenticationService.getUserFromToken(token);
    }


}
