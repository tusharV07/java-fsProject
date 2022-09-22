package com.stackroute.recommendations.config;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.stackroute.recommendations.model.Player;
import com.stackroute.recommendations.model.PlayerDto;
import com.stackroute.recommendations.model.PlayerResponse;
import com.stackroute.recommendations.service.PlayerService;

@Component
public class PlayerTask {

    @Autowired
    private PlayerService playerService;

    public void execute() {
        PlayerResponse remotePlayerResponse = playerService.getRemotePlayerResponse();
        List<PlayerDto> data = remotePlayerResponse.getData();
        List<Player> collect = data.parallelStream().map(PlayerDto::of).collect(Collectors.toList());
        collect.parallelStream().forEach(playerService::addOrUpdate);
    }

}
