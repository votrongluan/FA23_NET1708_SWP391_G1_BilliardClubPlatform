package com.example.BBP_Backend.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StaffInfoResponse {
    private String firstName;
    private String lastName;
    private String username;
    private String phone;
    private int clubId;
    private String clubName;
}
