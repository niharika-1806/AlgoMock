package com.algomock.backend.service;

import org.springframework.stereotype.Service;
import com.algomock.backend.repository.UserRepository;
import com.algomock.backend.model.User;
import java.util.List;


// Service tells spring that create and manage the object of this class as a Spring bean.
@Service
public class UserService {
    private final UserRepository userRepository;
//    Now spring creates userRepository and injects into userService
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

//    returning User because we need to return the actual saved entity
    public User createUser(String name, int age) {

        User user = new User();

        user.setName(name);
        user.setAge(age);

        return userRepository.save(user);
    }

    public User getUserById(Long id) {
//        this asks the repository to find the user whose primary key is this id
        return userRepository.findById(id).orElse(null);

    }
    public List<User> getAllUsers() {

        return userRepository.findAll();

    }
    public User updateUser(Long id, String name, int age) {

        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            return null;
        }

        user.setName(name);
        user.setAge(age);

        return userRepository.save(user);
    }
    public boolean deleteUser(Long id) {

        if (!userRepository.existsById(id)) {
            return false;
        }

        userRepository.deleteById(id);

        return true;
    }
}