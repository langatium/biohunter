package com.sap.innojam.biohunter.persistence;

import java.io.IOException;

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
		
	}
	
    /** {@inheritDoc} */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,
            IOException {
    	
    	User newUser = new User();
    	newUser.setUserName(request.getParameter("userName"));
    	newUser.setTotalScore(0.0);
    	newUser.setDescription(request.getParameter("description"));
    	
    	// TODO: not supported yet
    }
}
