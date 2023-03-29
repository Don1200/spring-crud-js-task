package com.example.spring.boot_security.controller;

import com.example.spring.boot_security.model.User;
import com.example.spring.boot_security.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/user/user")

    public User getUser(@AuthenticationPrincipal UserDetails userDetails) {

        return userService.findUserByEmail(userDetails.getUsername());
    }
}
