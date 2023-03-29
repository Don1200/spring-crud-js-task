package com.example.spring.boot_security.controller;

import com.example.spring.boot_security.model.Role;
import com.example.spring.boot_security.model.User;
import com.example.spring.boot_security.service.RoleService;
import com.example.spring.boot_security.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RequestMapping(value = "/admin")
@RestController
@RequiredArgsConstructor
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;


    @GetMapping(value = "/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping(value = "/roles")
    public List<Role> getAllRoles() {
        return roleService.findAllRoles();
    }

    @PostMapping(value = "/add")
    public User addUser(@RequestBody User user) {
        Set<Role> rolesSet = new HashSet<>();
        for (Role role : user.getRoles()) {
            rolesSet.add(roleService.findRoleByName(role.getRole()));
        }
        user.setRoles(rolesSet);
        return userService.addUser(user);
    }

    @GetMapping("/user")
    public User getUser(@RequestParam("id") Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/edit")
    public User editUser(@RequestBody User user) {
        Set<Role> rolesSet = new HashSet<>();
        for (Role role : user.getRoles()) {
            rolesSet.add(roleService.findRoleByName(role.getRole()));
        }
        user.setRoles(rolesSet);
        return userService.editUser(user);
    }

    @DeleteMapping("/delete")
    public void deleteUser(@RequestParam("id") Long id) {
        userService.deleteUser(id);
    }

    @GetMapping("/user-info")
    public User getUser(@AuthenticationPrincipal UserDetails userDetails) {

        return userService.findUserByEmail(userDetails.getUsername());
    }
}
