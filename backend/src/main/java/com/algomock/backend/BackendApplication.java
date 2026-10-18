package com.algomock.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//Whenever spring sees this, it understands that this is the main application.
/*It combines three components in one:
* 1. @Configuration- marks this as a configuration class
* 2. @Enableconfiguration - lets spring boot configure things automatically.
* 3. @ComponentScan- tells spring boot to scan this package and its subpackages like components
* repository and service. */
@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
//        The entire application starts because of this line
        SpringApplication.run(BackendApplication.class, args);
    }

}
