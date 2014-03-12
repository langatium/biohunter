package com.sap.innojam.biohunter.persistence;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.eclipse.persistence.config.PersistenceUnitProperties;
import org.persistence.BarcodeData2;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;
import com.sap.security.core.server.csi.IXSSEncoder;
import com.sap.security.core.server.csi.XSSEncoder;

/**
 * Servlet implementing a simple JPA based persistence sample application for SAP HANA Cloud Platform.
 */
public class BarcodeDataServlet extends PersistentStorageView {
//public class PersistenceWithJPAServlet extends HttpServlet {
//    private static final long serialVersionUID = 1L;
//    private static final Logger LOGGER = LoggerFactory.getLogger(PersistenceWithJPAServlet.class);
//
//    private DataSource ds;
//    private EntityManagerFactory emf;
//
//    /** {@inheritDoc} */
//    @SuppressWarnings({ "rawtypes", "unchecked" })
//    @Override
//    public void init() throws ServletException {
//        Connection connection = null;
//        try {
//            InitialContext ctx = new InitialContext();
//            ds = (DataSource) ctx.lookup("java:comp/env/jdbc/DefaultDB");
//
//            Map properties = new HashMap();
//            properties.put(PersistenceUnitProperties.NON_JTA_DATASOURCE, ds);
//            emf = Persistence.createEntityManagerFactory("biohunter", properties);
//        } catch (NamingException e) {
//            throw new ServletException(e);
//        }
//    }
//
//    /** {@inheritDoc} */
//    @Override
//    public void destroy() {
//        emf.close();
//    }

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/** {@inheritDoc} */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        EntityManager em = emf.createEntityManager();
        try {
            @SuppressWarnings("unchecked")
            List<BarcodeData2> resultList = em.createNamedQuery("AllData").getResultList();
            
            response.setContentType("application/json");
            PrintWriter out = response.getWriter();
            Gson gson = new Gson();
            out.print(gson.toJson(resultList));
            out.flush();
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
    	
    	HashMap <String, String> result = new HashMap<String, String>();
    	
        try {
        	
            doAdd(request);
            result.put("ok", "ok");
        } catch (Exception e) {
            response.getWriter().println("Persistence operation failed with reason: " + e.getMessage());
            LOGGER.error("Persistence operation failed", e);
            result.put("error", e.getMessage());
        }
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();
        out.print(gson.toJson(result));
    }

//    private void appendDataTable(HttpServletResponse response) throws SQLException, IOException {
//        // Append table that lists all persons
//        EntityManager em = emf.createEntityManager();
//        try {
//            @SuppressWarnings("unchecked")
//            List<BarcodeData2> resultList = em.createNamedQuery("AllData").getResultList();
//            
//            response.setContentType("application/json");
//            PrintWriter out = response.getWriter();
//            Gson gson = new Gson();
//            out.print(gson.toJson(resultList));
//            out.flush();
////            response.getWriter().println(
////                    "<p><table border=\"1\"><tr><th colspan=\"3\">"
////                            + (resultList.isEmpty() ? "" : resultList.size() + " ")
////                            + "Entries in the Database</th></tr>");
////            if (resultList.isEmpty()) {
////                response.getWriter().println("<tr><td colspan=\"3\">Database is empty</td></tr>");
////            } else {
////                response.getWriter().println("<tr><th>ID</th>"+
////                								 "<th>Longitude</th>"+
////                								 "<th>Latitude</th>"+
////                								 "<th>Date</th>"+
////                								 "<th>User</th>"+
////                								 "<th>Description</th>"+
////                								 "<th>Score</th>"+
////                							 	"<th>imageUrl</th>"+
////                							  "</tr>");
////            }
////            IXSSEncoder xssEncoder = XSSEncoder.getInstance();
////            for (BarcodeData2 p : resultList) {
////                response.getWriter().println(
////                        "<tr>"+
////                        	"<td>" + p.getId() +  "</td>" + 
////                        	"<td>" + xssEncoder.encodeHTML(p.getLongitude()) +  "</td>" + 
////                        	"<td>" + xssEncoder.encodeHTML(p.getLatitude()) +  "</td>" + 
////                        	"<td>" + xssEncoder.encodeHTML(p.getCaptureDate()) +  "</td>" +
////                        	"<td>" + p.getUserId() +  "</td>" +
////                        	"<td>" + xssEncoder.encodeHTML(p.getDescription()) + "</td>"+
////                        	"<td>" + p.getScore() +  "</td>" +
////                        	"<td>" + p.getImageUrl() +  "</td>" +
////                        "</tr>");
////            }
////            response.getWriter().println("</table></p>");
//        } finally {
//            em.close();
//        }
//    }
//
//    private void appendAddForm(HttpServletResponse response) throws IOException {
//        // Append form through which new persons can be added
//        response.getWriter().println(
//                "<p><form action=\"\" method=\"post\">" + "First name:<input type=\"text\" name=\"description\">"
//                        + "&nbsp;Last name:<input type=\"text\" name=\"LastName\">"
//                        + "&nbsp;<input type=\"submit\" value=\"Add Data Point\">" + "</form></p>");
//    }

    private void doAdd(HttpServletRequest request) throws ServletException, IOException, SQLException {
    	
    	HashMap <String, String> params = new HashMap<String, String>();
    	
		String description = request.getParameter("description");
		String longitude = request.getParameter("longitude");
		String latitude = request.getParameter("latitude");
		String captureDate = request.getParameter("captureDate");
		Integer userId = Integer.parseInt(request.getParameter("userId"));
		Double score = Double.parseDouble(request.getParameter("score"));
		String imageUrl = request.getParameter("imageUrl");
		String qrCode = request.getParameter("qrCode");
       
        EntityManager em = emf.createEntityManager();
        try {
                BarcodeData2 data = new BarcodeData2();
                
                if (description != null && ! description.trim().isEmpty()) {
                	data.setDescription(description);
                }
                if (longitude != null && ! longitude.trim().isEmpty()) {
                	data.setLongitude(longitude);
                }
                if (latitude != null && ! latitude.trim().isEmpty()) {
                	data.setLatitude(latitude);
                }
                if (captureDate != null && ! captureDate.trim().isEmpty()) {
                	data.setCaptureDate(captureDate);
                }
                if (userId != null) {
                	data.setUserId(userId);
                }
                if (score != null) {
                	data.setScore(score);
                }
                if (imageUrl != null && ! imageUrl.trim().isEmpty()) {
                	data.setImageUrl(imageUrl);
                }
                if (qrCode != null && ! qrCode.trim().isEmpty()) {
                	data.setQrCode(qrCode);
                }
                em.getTransaction().begin();
                em.persist(data);
                em.getTransaction().commit();

        } finally {
            em.close();
        }
    }
}