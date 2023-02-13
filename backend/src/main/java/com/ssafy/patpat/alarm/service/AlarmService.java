package com.ssafy.patpat.alarm.service;

import com.ssafy.patpat.alarm.controller.AlarmController;
import com.ssafy.patpat.alarm.dto.AlarmDto;
import com.ssafy.patpat.alarm.dto.RequestAlarmDto;
import com.ssafy.patpat.alarm.entity.Alarm;
import com.ssafy.patpat.alarm.repository.AlarmRepository;
import com.ssafy.patpat.common.dto.ResponseListDto;
import com.ssafy.patpat.common.util.SecurityUtil;
import com.ssafy.patpat.user.entity.User;
import com.ssafy.patpat.user.repository.UserRepository;
import com.sun.org.apache.xpath.internal.operations.Bool;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlarmService {
    private static final Logger LOGGER = LoggerFactory.getLogger(AlarmService.class);
    private final AlarmRepository alarmRepository;
    private final UserRepository userRepository;

    /** 알람 목록 보기 */
    @Transactional
    public ResponseListDto selectAlarmList(RequestAlarmDto requestAlarmDto){
        PageRequest pageRequest = PageRequest.of(requestAlarmDto.getOffSet(), requestAlarmDto.getLimit(), Sort.by("registDate").descending());
        Optional<User> user = SecurityUtil.getCurrentEmail().flatMap(userRepository::findOneWithAuthoritiesByEmail);
        Page<Alarm> alarms =  alarmRepository.findByUserUserId(user.get().getUserId(), pageRequest);
        List<AlarmDto> alarmDtoList =  alarms.toList().stream()
                .map(AlarmDto::new).collect(Collectors.toList());

        ResponseListDto responseListDto = new ResponseListDto();
        responseListDto.setList(alarmDtoList);
        responseListDto.setTotalPage(alarms.getTotalPages());
        responseListDto.setTotalCount(alarms.getTotalElements());

        return responseListDto;
    }

    /** 알람 상세보기 */
    @Transactional
    public AlarmDto detailAlarm(Long alarmId){

        Optional<Alarm> a = alarmRepository.findById(alarmId);
        if(!a.isPresent()){
            return null;
        }

        Alarm alarm = a.get();

        if(!alarm.getCheckRead()){
            alarm.setCheckRead(true);
        }

        AlarmDto alarmDto = new AlarmDto();
        if(alarm.getMsgCode().getCode() == 0) alarmDto.setMissingId(alarm.getMissingId());
        if(alarm.getMsgCode().getCode() == 8) alarmDto.setShelterId(alarm.getShelterId());

        return alarmDto;
    }

    /** 알람 삭제 */
    public Boolean deleteAlarm(Long alarmId){
        Optional<Alarm> a = alarmRepository.findById(alarmId);
        if(!a.isPresent()){
            return null;
        }
        alarmRepository.delete(a.get());
        return true;
    }
    public Boolean deleteAlarmAll(){
        Optional<User> user = SecurityUtil.getCurrentEmail().flatMap(userRepository::findOneWithAuthoritiesByEmail);

        if(!user.isPresent()){
            return null;
        }
        List<Alarm> alarms = alarmRepository.findByUserUserId(user.get().getUserId());
        alarmRepository.deleteAll(alarms);
        return true;
    }
}
