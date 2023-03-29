package com.example.spring.boot_security.repository;

import com.example.spring.boot_security.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Long> {

    Role findRoleByRole(String roles);
}
