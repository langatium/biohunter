package com.sap.innojam.biohunter.persistence;

import java.io.IOException;
import java.util.List;

import javax.persistence.EntityManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.persistence.User;

public class UserServlet extends PersistentStorageView {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Integer userId = Integer.getInteger(request.getParameter("userId"));
        EntityManager em = emf.createEntityManager();
        try {
            if (userId == null) {
            	@SuppressWarnings("unchecked")
				List<User> resultList = em.createNamedQuery("AllUsers").getResultList();
            	writeJsonOutput(response, resultList);
            } else {
            	User user = em.find(User.class, userId);
            	writeJsonOutput(response, user);
            }
        } catch (Exception e) {
            response.getWriter().println("Persistence operation failed with reason: " + e.getMessage());
            LOGGER.error("Persistence operation failed", e);
        } finally {
            em.close();
        }
	}
	
    /** {@inheritDoc} */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,
            IOException {
    	EntityManager em = emf.createEntityManager();
    	try {
		    	
		    	User newUser = new User();
		    	newUser.setUserName(request.getParameter("userName"));
		    	newUser.setTotalScore(0.0);
		    	newUser.setDescription(request.getParameter("description"));
		        em.getTransaction().begin();
		        em.persist(newUser);
		        em.getTransaction().commit();
		
		} finally {
		    em.close();
		}
    }
}
