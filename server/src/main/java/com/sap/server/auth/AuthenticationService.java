package com.sap.server.auth;

import com.sap.server.entities.Role;
import com.sap.server.entities.User;
import com.sap.server.repositories.UserRepository;
import com.sap.server.services.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.var;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(ResgisterRequest request) {
        var user = User.builder()
                .firstName(request.getFirstname())
                .lastName(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.User)
                .build();
        userRepository.save(user);
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();

    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("user not found"));
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
            }

 public String getUser(AuthenticationRequest request)   {
     authenticationManager.authenticate(
             new UsernamePasswordAuthenticationToken(
                     request.getEmail(),
                     request.getPassword()
             )
     );

     var user = userRepository.findByEmail(request.getEmail())
             .orElseThrow(() -> new UsernameNotFoundException("user not found"));
     var jwtToken = jwtService.generateToken(user);

   return jwtService.extractUsername(jwtToken);
 }


}

