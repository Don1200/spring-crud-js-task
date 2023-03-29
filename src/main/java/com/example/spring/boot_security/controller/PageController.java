package com.example.spring.boot_security.controller;


import com.example.spring.boot_security.model.Role;
import com.example.spring.boot_security.model.User;
import com.example.spring.boot_security.service.RoleService;
import com.example.spring.boot_security.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class PageController {
    private final UserService userService;
    private final RoleService roleService;

    @GetMapping(value = "/login")
    public String getLoginPage() {
        return "login";
    }

    @GetMapping(value = "/admin")
    public String adminPage (Model model, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findUserByEmail(userDetails.getUsername());
        List <Role> listRoles = roleService.findAllRoles();
        model.addAttribute("listRoles",listRoles);
        model.addAttribute("roles",user.getRolesByUser());
        model.addAttribute("user",user);
        return "admin";
    }

    @GetMapping("/user")
    public String userPage (Model model, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findUserByEmail(userDetails.getUsername());
        List <Role> listRoles = roleService.findAllRoles();
        model.addAttribute("listRoles",listRoles);
        model.addAttribute("user", user);
        model.addAttribute("roles",user.getRolesByUser());
        return "user";
    }

}
