package com.ssafy.patpat.protect.entity;

import com.ssafy.patpat.common.code.ProtectState;
import com.ssafy.patpat.common.code.category.Gender;
import com.ssafy.patpat.common.entity.Image;
import com.ssafy.patpat.user.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ShelterProtectedDog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sp_dog_id")
    private int spDogId;

    @Column(name = "shelter_id")
    private int shelterId;//
    @Column(name = "breed_id")
    private int breedId;//
    private LocalDate findingDate;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private double weight;//
    private Gender gender;//
    private boolean neutered;//
    private LocalDate registDate;//
    private String feature;//
    private int categoryEar;//
    private int categoryTail;//
    private int categoryColor;//
    private int categoryPattern;//
    private int categoryCloth;//
    private int categoryClothColor;//
    private String name;//
    private int age;//
    private String sidoCode;//
    private String gugunCode;//

    private ProtectState stateCode;//

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "shelter_dog_image",
            joinColumns = {@JoinColumn(name = "sp_dog_id")},
            inverseJoinColumns = {@JoinColumn(name = "image_id")})
    private List<Image> images;

    @ManyToMany(mappedBy = "favoriteDogs")
    private List<User> users;

}
