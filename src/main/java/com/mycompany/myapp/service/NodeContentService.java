package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.NodeContent;
import com.mycompany.myapp.repository.NodeContentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing NodeContent.
 */
@Service
@Transactional
public class NodeContentService {

    private final Logger log = LoggerFactory.getLogger(NodeContentService.class);

    private final NodeContentRepository nodeContentRepository;

    public NodeContentService(NodeContentRepository nodeContentRepository) {
        this.nodeContentRepository = nodeContentRepository;
    }

    /**
     * Save a nodeContent.
     *
     * @param nodeContent the entity to save
     * @return the persisted entity
     */
    public NodeContent save(NodeContent nodeContent) {
        log.debug("Request to save NodeContent : {}", nodeContent);
        return nodeContentRepository.save(nodeContent);
    }

    /**
     * Get all the nodeContents.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<NodeContent> findAll() {
        log.debug("Request to get all NodeContents");
        return nodeContentRepository.findAll();
    }

    /**
     * Get one nodeContent by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public NodeContent findOne(Long id) {
        log.debug("Request to get NodeContent : {}", id);
        return nodeContentRepository.findOne(id);
    }

    /**
     * Delete the nodeContent by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete NodeContent : {}", id);
        nodeContentRepository.delete(id);
    }
}
