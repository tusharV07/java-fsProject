package com.stackroute.recommendations.service;

import java.util.List;

import com.stackroute.recommendations.model.Player;
import com.stackroute.recommendations.model.PlayerResponse;

public interface PlayerService {
		Player addOrUpdate(Player player);

	    List<Player> recommend(Integer size);

	    PlayerResponse getRemotePlayerResponse();

}
