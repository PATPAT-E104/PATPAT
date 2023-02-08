package com.ssafy.patpat.consulting.repository;

import com.ssafy.patpat.consulting.entity.Consulting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ConsultingRepository extends JpaRepository<Consulting, Long> {
    Page<Consulting> findByUserIdAndRegistDateGreaterThanEqual(Long userId, LocalDate localDate, PageRequest pageRequest);
    Page<Consulting> findByShelterIdAndRegistDateGreaterThanEqual(Long shelterId, LocalDate localDate, PageRequest pageRequest);
    Consulting findByConsultingId(Long consultingId);
    List<Consulting> findByShelterIdAndRegistDate(Long shelterId, LocalDate localDate);


}
