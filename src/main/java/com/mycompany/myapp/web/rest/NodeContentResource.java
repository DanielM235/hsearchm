package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.NodeContent;
import com.mycompany.myapp.service.NodeContentService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing NodeContent.
 */
@RestController
@RequestMapping("/api")
public class NodeContentResource {

    private final Logger log = LoggerFactory.getLogger(NodeContentResource.class);

    private static final String ENTITY_NAME = "nodeContent";

    private final NodeContentService nodeContentService;

    public NodeContentResource(NodeContentService nodeContentService) {
        this.nodeContentService = nodeContentService;
    }

    /**
     * POST  /node-contents : Create a new nodeContent.
     *
     * @param nodeContent the nodeContent to create
     * @return the ResponseEntity with status 201 (Created) and with body the new nodeContent, or with status 400 (Bad Request) if the nodeContent has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/node-contents")
    @Timed
    public ResponseEntity<NodeContent> createNodeContent(@Valid @RequestBody NodeContent nodeContent) throws URISyntaxException {
        log.debug("REST request to save NodeContent : {}", nodeContent);
        if (nodeContent.getId() != null) {
            throw new BadRequestAlertException("A new nodeContent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NodeContent result = nodeContentService.save(nodeContent);
        return ResponseEntity.created(new URI("/api/node-contents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /node-contents : Updates an existing nodeContent.
     *
     * @param nodeContent the nodeContent to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated nodeContent,
     * or with status 400 (Bad Request) if the nodeContent is not valid,
     * or with status 500 (Internal Server Error) if the nodeContent couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/node-contents")
    @Timed
    public ResponseEntity<NodeContent> updateNodeContent(@Valid @RequestBody NodeContent nodeContent) throws URISyntaxException {
        log.debug("REST request to update NodeContent : {}", nodeContent);
        if (nodeContent.getId() == null) {
            return createNodeContent(nodeContent);
        }
        NodeContent result = nodeContentService.save(nodeContent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, nodeContent.getId().toString()))
            .body(result);
    }

    /**
     * GET  /node-contents : get all the nodeContents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of nodeContents in body
     */
    @GetMapping("/node-contents")
    @Timed
    public List<NodeContent> getAllNodeContents() {
        log.debug("REST request to get all NodeContents");
        return nodeContentService.findAll();
        }

    /**
     * GET  /node-contents/:id : get the "id" nodeContent.
     *
     * @param id the id of the nodeContent to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the nodeContent, or with status 404 (Not Found)
     */
    @GetMapping("/node-contents/{id}")
    @Timed
    public ResponseEntity<NodeContent> getNodeContent(@PathVariable Long id) {
        log.debug("REST request to get NodeContent : {}", id);
        NodeContent nodeContent = nodeContentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(nodeContent));
    }

    /**
     * DELETE  /node-contents/:id : delete the "id" nodeContent.
     *
     * @param id the id of the nodeContent to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/node-contents/{id}")
    @Timed
    public ResponseEntity<Void> deleteNodeContent(@PathVariable Long id) {
        log.debug("REST request to delete NodeContent : {}", id);
        nodeContentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
