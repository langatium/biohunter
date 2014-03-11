package com.sap.innojam.biohunter.persistence;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.sql.DataSource;

public class BarcodeDataDAO {

	private DataSource dataSource;

    /**
     * Create new data access object with data source.
     */
    public BarcodeDataDAO (DataSource newDataSource) throws SQLException {
        setDataSource(newDataSource);
    }

    /**
     * Get data source which is used for the database operations.
     */
    public DataSource getDataSource() {
        return dataSource;
    }

    /**
     * Set data source to be used for the database operations.
     */
    public void setDataSource(DataSource newDataSource) throws SQLException {
        this.dataSource = newDataSource;
        checkTable();
    }

    /**
     * Add a person to the table.
     */
    public void addBarcodeData(BarcodeData data) throws SQLException {
        Connection connection = dataSource.getConnection();

        try {
            PreparedStatement pstmt = connection
                    .prepareStatement("INSERT INTO barcode_data (id, longitude, latitude, captureDate, userId, description, score, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            pstmt.setString(1, UUID.randomUUID().toString());
            pstmt.setString(2, data.getLongitude());
            pstmt.setString(3, data.getLatitude());
            pstmt.setDate(4, data.getCaptureDate());
            pstmt.setInt(5, data.getUserId());
            pstmt.setString(6, data.getDescription());
            pstmt.setDouble(7, data.getScore());
            pstmt.setString(8, data.getImageUrl());
            pstmt.executeUpdate();
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

    /**
     * Get all persons from the table.
     */
    public List<BarcodeData> selectAllPersons() throws SQLException {
        Connection connection = dataSource.getConnection();
        try {
            PreparedStatement pstmt = connection
                    .prepareStatement("SELECT id, longitude, latitude, captureDate, userId, description, score, imageUrl FROM barcode_data");
            ResultSet rs = pstmt.executeQuery();
            ArrayList<BarcodeData> list = new ArrayList<BarcodeData>();
            while (rs.next()) {
            	BarcodeData d = new BarcodeData();
                d.setId(rs.getString(1));
                d.setLongitude(rs.getString(2));
                d.setLatitude(rs.getString(3));
                d.setCaptureDate(rs.getDate(4));
                d.setUserId(rs.getInt(5));
                d.setDescription(rs.getString(6));
                d.setScore(rs.getDouble(7));
                d.setImageUrl(rs.getString(8));
                list.add(d);
            }
            return list;
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

    /**
     * Check if the person table already exists and create it if not.
     */
    private void checkTable() throws SQLException {
        Connection connection = null;

        try {
            connection = dataSource.getConnection();
            if (!existsTable(connection)) {
                createTable(connection);
            }
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

    /**
     * Check if the person table already exists.
     */
    private boolean existsTable(Connection conn) throws SQLException {
        DatabaseMetaData meta = conn.getMetaData();
        ResultSet rs = meta.getTables(null, null, "barcode_data", null);
        while (rs.next()) {
            String name = rs.getString("TABLE_NAME");
            if (name.equals("barcode_data")) {
                return true;
            }
        }
        return false;
    }

    /**
     * Create the person table.
     */
    private void createTable(Connection connection) throws SQLException {
        PreparedStatement pstmt = connection
                .prepareStatement("CREATE TABLE barcode_data "
                        + "(ID INTEGER PRIMARY KEY, "
                        + "FIRSTNAME VARCHAR (255),"
                        + "LASTNAME VARCHAR (255))");
        pstmt.executeUpdate();
    }
	
}
