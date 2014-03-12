package org.persistence;

import static javax.persistence.GenerationType.AUTO;
import java.io.Serializable;

import javax.persistence.*;

@Entity
@NamedQuery(name = "AllData", query = "select d from BarcodeData2 d")
public class BarcodeData2 implements Serializable {

	private static final long serialVersionUID = 1L;

	public BarcodeData2() {
	}

	@Id
	@GeneratedValue
	private long id;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	@Basic
	private String longitude;
	@Basic
	private String latitude;
	@Basic
	private String captureDate;
	@Basic
	private Integer userId;
	@Basic
	private String description;
	@Basic
	private Double score;
	@Basic
	private String imageUrl;
	@Basic
	private String qrCode;
	
	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public String getCaptureDate() {
		return captureDate;
	}
	public void setCaptureDate(String captureDate) {
		this.captureDate = captureDate;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Double getScore() {
		return score;
	}
	public void setScore(Double score) {
		this.score = score;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public String getQrCode() {
		return qrCode;
	}
	public void setQrCode(String qrCode) {
		this.qrCode = qrCode;
	}
}