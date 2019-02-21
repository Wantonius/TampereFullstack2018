/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.spring.boot.ShoppingListAppTampere;

import com.opiframe.spring.boot.ShoppingListAppTampere.service.LoginService;
import java.io.IOException;
import java.util.Enumeration;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

/**
 *
 * @author Erno
 */
@Component
public class ShoppingFilter implements Filter {

    @Autowired LoginService service;
    
    @Bean
    public FilterRegistrationBean bean(ShoppingFilter filter) {
        FilterRegistrationBean filterBean = new FilterRegistrationBean();
        filterBean.setFilter(filter);
        filterBean.addUrlPatterns("/api/*");
        filterBean.setEnabled(true);
        filterBean.setName("ShoppingFilterBean");
        filterBean.setAsyncSupported(true);
        filterBean.setOrder(1);
        return filterBean;
    }
    @Override
    public void init(FilterConfig fc) throws ServletException {
        System.out.println("Init Filter");
    }

    @Override
    public void doFilter(ServletRequest sr, ServletResponse sr1, FilterChain fc) throws IOException, ServletException {
        boolean isFound = false;
        HttpServletRequest req = (HttpServletRequest)sr;
        HttpServletResponse res = (HttpServletResponse)sr1;
        Enumeration headerNames = req.getHeaderNames();
        while(headerNames.hasMoreElements()) {
            String header = (String)headerNames.nextElement();
            if(header.equals("token")) {
                if(service.isUserLogged(req.getHeader("token"))) {
                    fc.doFilter(sr,sr1);
                    isFound = true;
                }
            }
        }
        if(!isFound) {
            res.sendError(403);
        }
    }
    
}
