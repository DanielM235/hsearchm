package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Node;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.search.Query;
import org.hibernate.search.SearchFactory;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import java.util.List;
import java.util.concurrent.Future;

@Service
public class HibernateSearchService {

    private final EntityManager entityManager;

    @Autowired
    public HibernateSearchService(EntityManager entityManager) {
        super();
        this.entityManager = entityManager;
    }


    public void initializeHibernateSearch() {

        try {
            FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
            fullTextEntityManager.createIndexer().startAndWait();
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    @Transactional
    public List<Node> fuzzySearch(String searchTerm){

        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
        QueryBuilder qb = fullTextEntityManager.getSearchFactory().buildQueryBuilder().forEntity(Node.class).get();
        Query luceneQuery = qb.keyword().fuzzy().withEditDistanceUpTo(1).withPrefixLength(1).onFields("firstname", "lastname")
            .matching(searchTerm).createQuery();

        javax.persistence.Query jpaQuery = fullTextEntityManager.createFullTextQuery(luceneQuery, Node.class);

        // execute search

        List<Node> nodeList = null;
        try {
            nodeList = jpaQuery.getResultList();
        } catch (NoResultException nre) {

        }
        return nodeList;
    }

    /**
     * Process indexing if no index yet.
     */
    public void indexIfEmpty() {

        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
        SearchFactory searchFactory = fullTextEntityManager.getSearchFactory();
        IndexReader reader = searchFactory.getIndexReaderAccessor().open(Node.class);
        try {
            if (reader.numDocs() == 0) {
                this.index();
            } else {
            }
        } finally {
            searchFactory.getIndexReaderAccessor().close(reader);
        }
    }

    public void indexNode(Node node) {
        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
        fullTextEntityManager.index(node);
    }

    /**
     * Process indexing.
     *
     * @return true if everything ran well, else false.
     */
    public boolean index() {

        boolean success = false;

        try {
            FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
            Future<?> start = fullTextEntityManager.createIndexer(Node.class).start();
            while (!start.isDone()) {
                Thread.sleep(1000);
            }
            success = start.isDone();
        } catch (InterruptedException | IllegalArgumentException ex) {
        }
        return success;
    }
}
