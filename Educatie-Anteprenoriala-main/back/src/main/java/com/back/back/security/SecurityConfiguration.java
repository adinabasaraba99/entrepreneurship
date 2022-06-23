package com.back.back.security;

import com.back.back.filter.JwtRequestFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    public SecurityConfiguration(JwtRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers("/api/register",
                        "/api/confirmToken",
                        "/api/login",
                        "/loadCourses",
                        "/api/searchCourses").permitAll()
                .antMatchers("/api/user",
                        "/api/subscribe/*",
                        "/api/unsubscribe/*",
                        "/api/getAllSubscribers/*",
                        "/api/loadAllFavorites/*",
                        "/api/rateCourse/*").hasAnyAuthority()
                .antMatchers("/api/admin",
                        "/api/uploadCourse",
                        "api/loadMyCourses/*",
                        "api/deleteCourse/*").hasAuthority("MODERATOR")
                .antMatchers("/api/loadAllUsers/*",
                        "api/deleteUser",
                        "api/deleteCourse/*").hasAuthority("ADMIN")

                .and().exceptionHandling()
                .and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
