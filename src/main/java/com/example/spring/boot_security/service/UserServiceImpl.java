package com.example.spring.boot_security.service;

import com.example.spring.boot_security.model.User;
import com.example.spring.boot_security.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService  {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public User addUser(User user) {
        String newPass = passwordEncoder.encode(user.getPassword());
        user.setPassword(newPass);
        return userRepository.save(user);
    }
    @Override
    @Transactional
    public User editUser(User user) {
        String newPass = passwordEncoder.encode(user.getPassword());
        user.setPassword(newPass);
        return userRepository.save(user);
    }
    @Override
    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    @Transactional
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    @Transactional
    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }


}

