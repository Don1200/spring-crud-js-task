package com.example.spring.boot_security.repository;

import com.example.spring.boot_security.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    User findUserByEmail(String email);

}
