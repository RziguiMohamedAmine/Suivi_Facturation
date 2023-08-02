package com.sap.server.auth;

import com.sap.server.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResgisterRequest {
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private Role role;
}
