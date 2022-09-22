package com.stackroute.recommendations.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;
import org.springframework.stereotype.Component;

@Component
public class TaskConfig implements SchedulingConfigurer {

    @Autowired
    private PlayerTask playerTask;

    @Override
    public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
        taskRegistrar.addCronTask(() -> playerTask.execute(), "*/5 * * * * ?");
    }
}
