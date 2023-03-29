package com.example.spring.boot_security.service;


import com.example.spring.boot_security.model.Role;
import com.example.spring.boot_security.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@RequiredArgsConstructor
@Service
public class RoleServiceImpl implements RoleService{
   private final RoleRepository roleRepository;

    @Override
    public Role findRoleByName(String roles) {
        return roleRepository.findRoleByRole(roles);
    }

    @Override
    public List<Role> findAllRoles() {
        return roleRepository.findAll();
    }
}
