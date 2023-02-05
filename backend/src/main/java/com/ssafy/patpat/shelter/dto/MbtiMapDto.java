package com.ssafy.patpat.shelter.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class MbtiMapDto {
    int totalCount;
    List<SidoCountDto> list;
}
