package com.example.spring.boot_security.service;

import com.example.spring.boot_security.model.User;

import java.util.List;

public interface UserService  {
    User addUser (User user);
    User editUser (User user);
    void deleteUser(Long id);
    List<User> getAllUsers();
     User getUserById (Long id);
    User findUserByEmail (String email);

}
