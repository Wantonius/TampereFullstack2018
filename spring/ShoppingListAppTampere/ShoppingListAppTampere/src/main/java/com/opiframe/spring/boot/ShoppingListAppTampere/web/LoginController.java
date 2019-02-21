/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.spring.boot.ShoppingListAppTampere.web;

import com.opiframe.spring.boot.ShoppingListAppTampere.domain.User;
import com.opiframe.spring.boot.ShoppingListAppTampere.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;


/**
 *
 * @author Erno
 */

@RestController
public class LoginController {
    
    @Autowired LoginService service;
    
    @RequestMapping(value="/register", method=RequestMethod.POST)
    public ResponseEntity<String> register(@RequestBody User user) {
        boolean temp = service.registerUser(user);
        if(temp) {
            return new ResponseEntity<>("{\"message\":\"success\"}",HttpStatus.OK);
        }
        return new ResponseEntity<>("{\"message\":\"credentials in use\"}",HttpStatus.CONFLICT);
    }
    
    @RequestMapping(value="/login", method=RequestMethod.POST)
    public ResponseEntity<String> login(@RequestBody User user) {
        String temp = service.login(user);
        if("".equals(temp)) {
            return new ResponseEntity<>("{\"message\":\"Wrong Credentials\"}",HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>("{\"token\":\""+temp+"\"}",HttpStatus.OK);
    }
}
