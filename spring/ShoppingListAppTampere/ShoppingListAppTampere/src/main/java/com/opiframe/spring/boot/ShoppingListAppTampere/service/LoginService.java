/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.spring.boot.ShoppingListAppTampere.service;

import com.opiframe.spring.boot.ShoppingListAppTampere.domain.User;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

/**
 *
 * @author Erno
 */
@Service
public class LoginService {
    
    private final Map<String,User> registeredUsers;
    private final Map<String,User> loggedUsers;

    
    public LoginService() {
        registeredUsers = new HashMap<>();
        loggedUsers = new HashMap<>();
    }
    
    public boolean registerUser(User user) {
        if (user == null) {
            return false;
        }
        if(registeredUsers.containsKey(user.getUsername())) {
            return false;
        }
        if("".equals(user.getPassword()) || user.getPassword() == null) {
            return false;
        }
        registeredUsers.put(user.getUsername(), user);
        return true;
    }
    
    public String login(User user) {
        if (user == null) {
            return "";
        }
        if(registeredUsers.containsKey(user.getUsername())) {
            User temp = registeredUsers.get(user.getUsername());
            if(temp.getPassword().equals(user.getPassword())) {
                    String token = Tokeniser.createToken();
                    loggedUsers.put(token, user);
                    return token;
            }
        }
        return "";
    }
    
    public boolean isUserLogged(String token) {
        return loggedUsers.containsKey(token);
    }
}
