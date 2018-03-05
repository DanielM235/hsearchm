package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.NodeContent;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the NodeContent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NodeContentRepository extends JpaRepository<NodeContent, Long> {

}
