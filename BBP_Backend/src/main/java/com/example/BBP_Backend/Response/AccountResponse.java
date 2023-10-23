package com.example.BBP_Backend.Response;

import com.example.BBP_Backend.Enum.Role;
import com.example.BBP_Backend.Model.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccountResponse {
    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("status")
    private String status;
    @JsonProperty("message")
    private String message;
    @JsonProperty("user")
    private User user;
}