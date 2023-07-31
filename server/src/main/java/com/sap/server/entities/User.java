package com.sap.server.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long idUser;
    private String prenom;
    private String nom;

    @ManyToMany(mappedBy="users", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Role> roles;



}
