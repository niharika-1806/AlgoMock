package com.algomock.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.algomock.backend.model.User;
import com.algomock.backend.model.UserResponse;

import com.algomock.backend.service.UserService;
import java.util.List;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;



//This class handles HTTPS requests
@RestController
public class HelloController {
/*    Hello controller needs a userservice so it looks for userservice object and then injects into the constructor.
* So we don't need to */
//    we're initializing the object for userService here
    public HelloController(UserService userService) {

        this.userService = userService;

    }

//    This maps a URL to a java method
    @GetMapping("/hello")

/* whatever this method returns becomes a HTTP response. So when browser requests /hello,
 method executes and this msg id displayed on the browser. */

    public String hello() {

        return "Hello from AlgoMock Backend!";

    }

    @PostMapping("/user")
//    takes the json coming in the request body and convert it into this java object.

//    this method returns an HTTP response whose body is user
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = userService.createUser(
                user.getName(),
                user.getAge()
        );
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedUser);

    }
    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {

        User user = userService.getUserById(id);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(user);
    }




//     A different way of sending data, here Niharika is in query parameter
    @GetMapping("/search")
    public String searchUser(@RequestParam String name) {

        return "Searching for user: " + name;
    }

//    this automatically converts java object to JSON to send back our data to controller
    @GetMapping("/user-json")
    public UserResponse getUserJson() {

        return new UserResponse(25, "Niharika", 21);
    }
//    final means the dependency must be assigned when the controller is constructor and cannot be replaced later.
    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {

        List<User> users = userService.getAllUsers();

        return ResponseEntity.ok(users);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id,
            @RequestBody User user) {

        User updatedUser = userService.updateUser(
                id,
                user.getName(),
                user.getAge()
        );

        if (updatedUser == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {

        boolean deleted = userService.deleteUser(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }


}