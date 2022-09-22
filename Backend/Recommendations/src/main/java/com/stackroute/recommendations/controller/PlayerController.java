package com.stackroute.recommendations.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.recommendations.config.PlayerTask;
import com.stackroute.recommendations.model.Player;
import com.stackroute.recommendations.service.PlayerService;

@RestController
@RequestMapping("/api/v1/player")
@CrossOrigin(origins = "*")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @Autowired
    private PlayerTask playerTask;

    @GetMapping("/recommend/{size}")
    public ResponseEntity<?> recommend(@PathVariable Integer size){
        List<Player> recommend = playerService.recommend(size);
        return ResponseEntity.ok(recommend);
    }

    @PostMapping("/sync")
    public ResponseEntity<?> sync(){
        playerTask.execute();
        return ResponseEntity.ok(null);
    }
}
