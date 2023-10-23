package com.example.BBP_Backend.Response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewsResponse {
    private int id;

    private int star;

    private String comment;

    @JsonFormat(pattern="dd/MM/yyyy")
    private Date date;

    private String avatarLink;

    private String name;


}
