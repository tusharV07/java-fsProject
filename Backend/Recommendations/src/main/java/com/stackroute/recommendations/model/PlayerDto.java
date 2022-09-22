package com.stackroute.recommendations.model;

public class PlayerDto {
	
		private String id;
	    private String name;
	    private String country;
	    
	    
	    public Player of () {
	        Player player = new Player();
	        player.setCountry(country);
	        player.setName(name);
	        player.setPlayerId(id);
	        return player;
	    }
	    
	    public String getId() {
	        return id;
	    }

	    public void setId(String id) {
	        this.id = id;
	    }

	    public String getName() {
	        return name;
	    }

	    public void setName(String name) {
	        this.name = name;
	    }

	    public String getCountry() {
	        return country;
	    }

	    public void setCountry(String country) {
	        this.country = country;
	    }

}
