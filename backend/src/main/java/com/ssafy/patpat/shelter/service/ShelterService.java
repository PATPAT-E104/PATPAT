package com.ssafy.patpat.shelter.service;

import com.ssafy.patpat.common.dto.ResponseMessage;
import com.ssafy.patpat.shelter.dto.*;
import com.ssafy.patpat.shelter.entity.Gugun;
import com.ssafy.patpat.shelter.entity.Shelter;
import com.ssafy.patpat.shelter.entity.Sido;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ShelterService {
    List<Sido> sidoList();
    List<Gugun> gugunList(String sidoCode);
    List<ShelterDto> shelterList(RequestShelterDto dto);
    List<ShelterDto> shelterListInVolunteer(String gugunCode);
    ShelterDto detailShelter(int shelterId);
    BreedDto selectBreedByMbti(String mbtiId);
    AuthCodeDto insertShelter(RequestParamShelterInsertDto requestParamShelterInsertDto);

    ResponseMessage updateShelter(String shelterId, List<MultipartFile> uploadFile, ShelterDto shelterDto);

    ResponseMessage AuthShelter(String authCode);

    List<BreedDto> selectBreedList();

    List<SidoCountDto> selectBreedCountByMbti(int breedId);
}
