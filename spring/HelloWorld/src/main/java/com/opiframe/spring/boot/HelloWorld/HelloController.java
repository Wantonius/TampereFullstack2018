/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.spring.boot.HelloWorld;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Erno
 */
@RestController
public class HelloController {
    
    @RequestMapping(value="/", method=RequestMethod.GET)
    public ResponseEntity<Message> getMessage() {
        Message message = new Message();
        message.setMessage("Hello World!");
        return new ResponseEntity<Message>(message,HttpStatus.OK);
    }
}
