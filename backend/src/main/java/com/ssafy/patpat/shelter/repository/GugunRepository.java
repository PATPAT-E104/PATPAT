package com.ssafy.patpat.shelter.repository;

import com.ssafy.patpat.shelter.entity.Gugun;
import com.ssafy.patpat.shelter.entity.Sido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GugunRepository extends JpaRepository<Gugun,String> {
    List<Gugun> findBySidoCode(String sidoCode);
    Gugun findBySidoCodeAndName(String sidoCode, String name);
}