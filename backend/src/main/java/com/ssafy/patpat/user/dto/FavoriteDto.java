package com.ssafy.patpat.user.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.patpat.common.dto.FileDto;
import io.swagger.models.auth.In;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
@Builder
public class FavoriteDto {
    private int spDogId;
    private Long userId;
    private String name;
    private String imageUrl;
    private int stateCode;
    private String state;
    private double weight;
    private boolean neutered;

    private String gender;
    private Integer genderCode;

    private int age;
}
