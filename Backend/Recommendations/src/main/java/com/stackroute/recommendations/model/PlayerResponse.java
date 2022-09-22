package com.stackroute.recommendations.model;

import java.util.List;

public class PlayerResponse {

	  private String apiKey;

	    private List<PlayerDto> data;

	    public String getApiKey() {
	        return apiKey;
	    }

	    public void setApiKey(String apiKey) {
	        this.apiKey = apiKey;
	    }

	    public List<PlayerDto> getData() {
	        return data;
	    }

	    public void setData(List<PlayerDto> data) {
	        this.data = data;
	    }
}
