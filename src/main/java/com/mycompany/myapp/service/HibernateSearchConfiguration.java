package com.mycompany.myapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManager;

@Configuration
public class HibernateSearchConfiguration {

    @Autowired
    private EntityManager entityManager;

    @Bean
    HibernateSearchService hibernateSearchService() {
        HibernateSearchService hibernateSearchService = new HibernateSearchService(entityManager);
        hibernateSearchService.initializeHibernateSearch();
        return hibernateSearchService;
    }
}