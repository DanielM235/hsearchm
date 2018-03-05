//package com.mycompany.myapp.repository;
//
//import com.mycompany.myapp.domain.Node;
//import org.apache.lucene.index.IndexReader;
//import org.hibernate.search.SearchFactory;
//import org.hibernate.search.jpa.FullTextEntityManager;
//import org.hibernate.search.jpa.FullTextQuery;
//import org.hibernate.search.jpa.Search;
//import org.hibernate.search.query.dsl.QueryBuilder;
//import org.springframework.stereotype.Repository;
//import org.springframework.transaction.annotation.Transactional;
//
//import javax.persistence.EntityManager;
//import javax.persistence.PersistenceContext;
//import java.util.List;
//import java.util.concurrent.Future;
//
//import static org.hibernate.search.jpa.Search.getFullTextEntityManager;
//
//@Repository
//@Transactional
//public class NodeSearchLuceneRepository {
//
//    public NodeSearchLuceneRepository() {
//        this.indexIfEmpty();
//    }
//
//    @PersistenceContext
//    private EntityManager entityManager;
//
//    @Transactional
//    public List<Node> search(String text) {
//
//        // get the full text entity manager
//        FullTextEntityManager fullTextEntityManager = getFullTextEntityManager(entityManager);
//
//        // create the query using Hibernate Search query DSL
////        QueryBuilder queryBuilder = fullTextEntityManager.getSearchFactory().buildQueryBuilder().forEntity(Node.class).get();
//
////        BooleanJunction<BooleanJunction> bool = queryBuilder.bool();
//
//        // a complex query with boost on title and child content field.
////        if (StringUtils.isNotBlank(text)) {
////            bool.must(queryBuilder.simpleQueryString()
////                .onField(NODE_CONTENTS_TITLE).boostedTo(10f)
////                .andField(NODE_CHILD_CONTENT).boostedTo(5f)
////                .andField(NODE_DESCRIPTION)
////                .andField(COMMENTS_CONTENT)
////                .andField(LIFECYCLES_LOGIN)
////                .andField(LIFECYCLES_FIRSTNAME)
////                .andField(LIFECYCLES_LASTNAME)
////                .matching(text.toLowerCase().concat("*")).createQuery()
////            );
////        }
//        QueryBuilder qb = fullTextEntityManager.getSearchFactory()
//            .buildQueryBuilder().forEntity(Node.class).get();
//        org.apache.lucene.search.Query luceneQuery = qb
//            .keyword()
//            .onFields("description")
//            .matching(text.toLowerCase().concat("*"))
//            .createQuery();
////        org.apache.lucene.search.Query luceneQuery = bool.createQuery();
//
//        // wrap Lucene query in an Hibernate Query object
//        FullTextQuery jpaQuery = fullTextEntityManager.createFullTextQuery(luceneQuery, Node.class);
//
//        // For future dev : uncomment line below to get scoring explanation in "results" variable.
//        // jpaQuery.setProjection( ProjectionConstants.SCORE, ProjectionConstants.EXPLANATION, ProjectionConstants.THIS );
//
//        // execute search and return results (sorted by relevance as default)
//        @SuppressWarnings("unchecked")
//        List<Node> results = jpaQuery.getResultList();
////        List<Node> results = Lists.newArrayList();
//
//        return results;
//    }
//
//    /**
//     * Process indexing if no index yet.
//     */
//    public void indexIfEmpty() {
//
//        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
//        SearchFactory searchFactory = fullTextEntityManager.getSearchFactory();
//        IndexReader reader = searchFactory.getIndexReaderAccessor().open(Node.class);
//        try {
//            if (reader.numDocs() == 0) {
//                this.index();
//            } else {
//            }
//        } finally {
//            searchFactory.getIndexReaderAccessor().close(reader);
//        }
//    }
//
//    public void indexNode(Node node) {
//        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
//        fullTextEntityManager.index(node);
//    }
//
//    /**
//     * Process indexing.
//     *
//     * @return true if everything ran well, else false.
//     */
//    public boolean index() {
//
//        boolean success = false;
//
//        try {
//            FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
//            Future<?> start = fullTextEntityManager.createIndexer(Node.class).start();
//            while (!start.isDone()) {
//                Thread.sleep(1000);
//            }
//            success = start.isDone();
//        } catch (InterruptedException | IllegalArgumentException ex) {
//        }
//        return success;
//    }
//
//}
