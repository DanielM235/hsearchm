package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Node;
import com.mycompany.myapp.repository.NodeRepository;
import com.mycompany.myapp.repository.NodeSearchLuceneRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Node.
 */
@Service
@Transactional
public class NodeService {

    private final Logger log = LoggerFactory.getLogger(NodeService.class);

    private final NodeRepository nodeRepository;

    NodeSearchLuceneRepository nodeSearchLuceneRepository;

    public NodeService(NodeRepository nodeRepository, NodeSearchLuceneRepository nodeSearchLuceneRepository) {
        this.nodeRepository = nodeRepository;
        this.nodeSearchLuceneRepository = nodeSearchLuceneRepository;
    }

    /**
     * Save a node.
     *
     * @param node the entity to save
     * @return the persisted entity
     */
    public Node save(Node node) {
        log.debug("Request to save Node : {}", node);
        return nodeRepository.save(node);
    }

    /**
     * Get all the nodes.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Node> findAll() {
        log.debug("Request to get all Nodes");
        return nodeRepository.findAll();
    }

    /**
     * Get one node by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Node findOne(Long id) {
        log.debug("Request to get Node : {}", id);
        return nodeRepository.findOne(id);
    }

    /**
     * Delete the node by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Node : {}", id);
        nodeRepository.delete(id);
    }

    /**
     * Get nodesDesc by product and version, and criterias in parameter.
     * @param text a search string, not used if null;
     * @return the list of nodesDesc mathcing criteria.
     */
    @Transactional(rollbackFor = Exception.class)
    public List<Node> getNodesByCriteria(String text) {
        return this.nodeSearchLuceneRepository.search(text);
    }
}
