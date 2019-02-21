/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.spring.boot.ShoppingListAppTampere.service;

import com.opiframe.spring.boot.ShoppingListAppTampere.domain.ShoppingItem;
import java.util.List;
import java.util.ArrayList;
import org.springframework.stereotype.Service;

/**
 *
 * @author Erno
 */
@Service
public class ShoppingService {
    
    private final List<ShoppingItem> shoppingList;
    private long databaseID = 100;
    
    public ShoppingService() {
        shoppingList = new ArrayList<>();  
    }
    
    public List<ShoppingItem> getList() {
        return this.shoppingList;
    }
    
    public boolean addToList(ShoppingItem item) {
        item.setId(databaseID);
        this.databaseID++;
        this.shoppingList.add(item);
        return true;
    }
    
    public boolean removeFromList(long id) {
        for(ShoppingItem i:this.shoppingList) {
            if(i.getId() == id) {
                this.shoppingList.remove(i);
                return true;
            }
        }
        return false;
    }
}
