/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.spring.boot.ShoppingListAppTampere.web;

import com.opiframe.spring.boot.ShoppingListAppTampere.domain.ShoppingItem;
import com.opiframe.spring.boot.ShoppingListAppTampere.service.ShoppingService;
import java.util.List;
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
public class ShoppingController {
    
    @Autowired ShoppingService service;
    
    @RequestMapping(value="/api/shoppinglist", method=RequestMethod.GET)
    public ResponseEntity<List<ShoppingItem>> getShoppingList() {
        List<ShoppingItem> temp = service.getList();
        return new ResponseEntity<>(temp,HttpStatus.OK);
    }
    
    @RequestMapping(value="/api/shoppinglist", method=RequestMethod.POST)
    public ResponseEntity<String> addToList(@RequestBody ShoppingItem item) {
        boolean success = service.addToList(item);
        if(success) {
            return new ResponseEntity<>("{\"message\":\"success\"}",HttpStatus.OK);
        }
        return new ResponseEntity<>("{\"message\":\"failure\"}",HttpStatus.NOT_FOUND);
    }
    
    @RequestMapping(value="/api/shoppinglist/{id}", method=RequestMethod.DELETE)
    public ResponseEntity<String> removeFromList(@PathVariable("id") long id) {
        boolean success = service.removeFromList(id);
        if(success) {
            return new ResponseEntity<>("{\"message\":\"success\"}",HttpStatus.OK);
        }
        return new ResponseEntity<>("{\"message\":\"failure\"}",HttpStatus.NOT_FOUND);
    }    
    
}
