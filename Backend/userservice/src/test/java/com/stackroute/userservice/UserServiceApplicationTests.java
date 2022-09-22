package com.stackroute.userservice;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@EnableJpaRepositories("com.stackroute.userservice.UserRepositoryTest")
public class UserServiceApplicationTests {

	@Test
	public void contextLoads() {
	}

}

