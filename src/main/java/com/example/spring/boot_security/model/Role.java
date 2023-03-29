package com.example.spring.boot_security.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor

@Entity
@Table (name = "roles")
public class Role implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column (name = "role_name")
    private String role;

    @JsonIgnore
    @ManyToMany(mappedBy = "roles")
    @ToString.Exclude
    private List<User> users;

    public Role(Long id, String role) {
        this.id = id;
        this.role = role;
    }

    public Role(String role) {
        this.role = role;
    }

    public Role(String role, List<User> users) {
        this.role = role;
        this.users = users;
    }

    public String getRole() {
        return role;
    }

    @Override
    public String getAuthority() {
        return getRole();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Role role = (Role) o;
        return id.equals(role.id) && role.equals(role.role) && users.equals(role.users);
    }

}
