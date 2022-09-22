package com.stackroute.recommendations.model;

import java.util.Objects;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document
public class Player {
		
		@Id
	 	private ObjectId id;
	    private String playerId;
	    private String name;
	    private String country;

	    public String getPlayerId() {
	        return playerId;
	    }

	    public void setPlayerId(String playerId) {
	        this.playerId = playerId;
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

	    public ObjectId getId() {
	        return id;
	    }

	    public void setId(ObjectId id) {
	        this.id = id;
	    }

	    public void modify(Player player) {
	        if (player.getCountry() != null) {
	            this.country = player.getCountry();
	        }
	        if (player.getName() != null) {
	            this.name = player.getName();
	        }
	        if (player.getPlayerId() != null) {
	            this.playerId = player.getPlayerId();
	        }
	    }

	    @Override
	    public boolean equals(Object o) {
	        if (this == o) return true;
	        if (o == null || getClass() != o.getClass()) return false;
	        Player player = (Player) o;
	        return playerId.equals(player.playerId) && name.equals(player.name) && country.equals(player.country);
	    }

	    @Override
	    public int hashCode() {
	        return Objects.hash(playerId, name, country);
	    }
	    
}
