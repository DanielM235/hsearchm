package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.HsearchmApp;

import com.mycompany.myapp.domain.NodeContent;
import com.mycompany.myapp.domain.Node;
import com.mycompany.myapp.repository.NodeContentRepository;
import com.mycompany.myapp.service.NodeContentService;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the NodeContentResource REST controller.
 *
 * @see NodeContentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HsearchmApp.class)
public class NodeContentResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Autowired
    private NodeContentRepository nodeContentRepository;

    @Autowired
    private NodeContentService nodeContentService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restNodeContentMockMvc;

    private NodeContent nodeContent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NodeContentResource nodeContentResource = new NodeContentResource(nodeContentService);
        this.restNodeContentMockMvc = MockMvcBuilders.standaloneSetup(nodeContentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NodeContent createEntity(EntityManager em) {
        NodeContent nodeContent = new NodeContent()
            .title(DEFAULT_TITLE)
            .content(DEFAULT_CONTENT);
        // Add required entity
        Node node = NodeResourceIntTest.createEntity(em);
        em.persist(node);
        em.flush();
        nodeContent.setNode(node);
        return nodeContent;
    }

    @Before
    public void initTest() {
        nodeContent = createEntity(em);
    }

    @Test
    @Transactional
    public void createNodeContent() throws Exception {
        int databaseSizeBeforeCreate = nodeContentRepository.findAll().size();

        // Create the NodeContent
        restNodeContentMockMvc.perform(post("/api/node-contents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nodeContent)))
            .andExpect(status().isCreated());

        // Validate the NodeContent in the database
        List<NodeContent> nodeContentList = nodeContentRepository.findAll();
        assertThat(nodeContentList).hasSize(databaseSizeBeforeCreate + 1);
        NodeContent testNodeContent = nodeContentList.get(nodeContentList.size() - 1);
        assertThat(testNodeContent.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testNodeContent.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createNodeContentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nodeContentRepository.findAll().size();

        // Create the NodeContent with an existing ID
        nodeContent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNodeContentMockMvc.perform(post("/api/node-contents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nodeContent)))
            .andExpect(status().isBadRequest());

        // Validate the NodeContent in the database
        List<NodeContent> nodeContentList = nodeContentRepository.findAll();
        assertThat(nodeContentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllNodeContents() throws Exception {
        // Initialize the database
        nodeContentRepository.saveAndFlush(nodeContent);

        // Get all the nodeContentList
        restNodeContentMockMvc.perform(get("/api/node-contents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nodeContent.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())));
    }

    @Test
    @Transactional
    public void getNodeContent() throws Exception {
        // Initialize the database
        nodeContentRepository.saveAndFlush(nodeContent);

        // Get the nodeContent
        restNodeContentMockMvc.perform(get("/api/node-contents/{id}", nodeContent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nodeContent.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNodeContent() throws Exception {
        // Get the nodeContent
        restNodeContentMockMvc.perform(get("/api/node-contents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNodeContent() throws Exception {
        // Initialize the database
        nodeContentService.save(nodeContent);

        int databaseSizeBeforeUpdate = nodeContentRepository.findAll().size();

        // Update the nodeContent
        NodeContent updatedNodeContent = nodeContentRepository.findOne(nodeContent.getId());
        // Disconnect from session so that the updates on updatedNodeContent are not directly saved in db
        em.detach(updatedNodeContent);
        updatedNodeContent
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT);

        restNodeContentMockMvc.perform(put("/api/node-contents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNodeContent)))
            .andExpect(status().isOk());

        // Validate the NodeContent in the database
        List<NodeContent> nodeContentList = nodeContentRepository.findAll();
        assertThat(nodeContentList).hasSize(databaseSizeBeforeUpdate);
        NodeContent testNodeContent = nodeContentList.get(nodeContentList.size() - 1);
        assertThat(testNodeContent.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testNodeContent.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingNodeContent() throws Exception {
        int databaseSizeBeforeUpdate = nodeContentRepository.findAll().size();

        // Create the NodeContent

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restNodeContentMockMvc.perform(put("/api/node-contents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nodeContent)))
            .andExpect(status().isCreated());

        // Validate the NodeContent in the database
        List<NodeContent> nodeContentList = nodeContentRepository.findAll();
        assertThat(nodeContentList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteNodeContent() throws Exception {
        // Initialize the database
        nodeContentService.save(nodeContent);

        int databaseSizeBeforeDelete = nodeContentRepository.findAll().size();

        // Get the nodeContent
        restNodeContentMockMvc.perform(delete("/api/node-contents/{id}", nodeContent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<NodeContent> nodeContentList = nodeContentRepository.findAll();
        assertThat(nodeContentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NodeContent.class);
        NodeContent nodeContent1 = new NodeContent();
        nodeContent1.setId(1L);
        NodeContent nodeContent2 = new NodeContent();
        nodeContent2.setId(nodeContent1.getId());
        assertThat(nodeContent1).isEqualTo(nodeContent2);
        nodeContent2.setId(2L);
        assertThat(nodeContent1).isNotEqualTo(nodeContent2);
        nodeContent1.setId(null);
        assertThat(nodeContent1).isNotEqualTo(nodeContent2);
    }
}
