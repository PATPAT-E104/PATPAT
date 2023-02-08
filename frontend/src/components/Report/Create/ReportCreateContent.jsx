import { useMutation, useQuery } from '@tanstack/react-query';
import { createReport } from 'apis/api/report';
import React, { useEffect, useState } from 'react';
import styles from './ReportCreateContent.module.scss';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';
import Test from '../../../assets/images/volunteer.png';
import { getBreedsList } from 'apis/api/shelter';
import { changeBreedList } from 'utils/changeSelectTemplate';
import './ckeditor.scss';
import MenuLink from 'components/ShelterPage/Navbar/MenuLink';
import { MapMarker, Map } from 'react-kakao-maps-sdk';
import Navbar from 'components/ShelterPage/Navbar/Navbar';
import infoIcon from 'assets/images/forpaw-info.png';
import DetailModal from 'components/Common/DetailModal';
import EarDetail from './EarDetail';
import PatternDetail from './PatternDetail';
import TailDetail from './TailDetail';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useRef } from 'react';

export default function ReportCreateContent() {
  // info
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [typeCode, setTypeCode] = useState({ value: 0 });
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [genderCode, setGenderCode] = useState(3);
  const [breedId, setBreedId] = useState({ value: 0 });
  const [kg, setKg] = useState(0);
  const [neuteredCode, setNeuteredCode] = useState({ value: 0 });
  const [content, setContent] = useState('');

  // category
  const [categoryEar, setCategoryEar] = useState({ value: 0 });
  const [categoryColor, setCategoryColor] = useState(0);
  const [categoryPattern, setCategoryPattern] = useState({ value: 0 });
  const [categoryTail, setCategoryTail] = useState({ value: 0 });
  const [categoryCloth, setCategoryCloth] = useState({ value: 0 });
  const [categoryClothColor, setCategoryClothColor] = useState({ value: 0 });
  const [color1, setColor1] = useState('#000000');
  const [color2, setColor2] = useState('#000000');

  // Picture
  const [preFile, setPreFile] = useState([]);
  const [fileList, setFileList] = useState([]);

  // Modal
  const [modal, setModal] = useState(false);
  const [modalNum, setModalNum] = useState();
  const reader = new FileReader();

  // Alert
  const [titleAlertOpen, setTitleAlertOpen] = useState(0);
  const [fileListAlertOpen, setFileListAlertOpen] = useState(0);
  const [nameAlertOpen, setNameAlertOpen] = useState(0);
  const [typeCodeAlertOpen, setTypeCodeAlertOpen] = useState(0);
  const [breedAlertOpen, setBreedAlertOpen] = useState(0);
  const [positionAlertOpen, setPositionAlertOpen] = useState(0);
  const [contentAlertOpen, setContentAlertOpen] = useState(0);

  const titleInput = useRef();
  const fileListInput = useRef();
  const nameInput = useRef();
  const typeCodeInput = useRef();
  const breedInput = useRef();
  const positionInput = useRef();
  const contentInput = useRef();

  // useEffect

  useEffect(() => {
    setLat(position.lat);
    setLng(position.lng);
  }, [position]);

  // useEffect(() => {
  //   setCategoryColor([color1, color2]);
  // }, [color1, color2]);

  // Picture
  const handleAddImages = e => {
    const imageFileList = [...fileList];
    let imageUrlLists = [...preFile];
    const imageLists = e.target.files;

    for (let i = 0; i < imageLists.length; i++) {
      imageFileList.push(imageLists[i]);
    }

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }
    setPreFile(imageUrlLists);
    setFileList(imageFileList);
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = id => {
    setPreFile(preFile.filter((_, index) => index !== id));
    setFileList(fileList.filter((_, index) => index !== id));
  };

  // FormData
  let formData = new FormData();
  formData.append('title', title);
  formData.append('name', name);
  formData.append('age', age);
  formData.append('genderCode', genderCode);
  formData.append('breedId', breedId.value);
  formData.append('kg', kg);
  formData.append('neuteredCode', neuteredCode.value);
  formData.append('content', content);
  formData.append('categoryEar', categoryEar.value);
  formData.append('categoryColor', categoryColor);
  formData.append('categoryPattern', categoryPattern.value);
  formData.append('categoryTail', categoryTail.value);
  formData.append('categoryCloth', categoryCloth.value);
  formData.append('categoryClothColor', categoryClothColor.value);
  formData.append('typeCode', typeCode.value);
  formData.append('uploadFile', fileList);
  formData.append('latitude', lat);
  formData.append('longitude', lng);

  // POST (등록)

  const { mutate: mutation } = useMutation(['createReport'], () => {
    return createReport(formData);
  });

  // GET (견종 리스트)
  const { isLoading, data } = useQuery({
    queryKey: ['getBreedsList'],
    queryFn: () => getBreedsList(),
  });
  const breedData = data;

  // console.log(uploadFile);
  if (isLoading) return;

  // Select Data
  // console.log(fileList);

  const stateOpt = [
    { value: 1, label: '실종' },
    { value: 2, label: '임시보호' },
    { value: 3, label: '완료' },
  ];

  const neuteredOpt = [
    { value: 1, label: '유' },
    { value: 2, label: '무' },
    { value: 3, label: '모름' },
  ];

  const categoryEarOpt = [
    { value: 0, label: '모름' },
    { value: 1, label: '직립귀' },
    { value: 2, label: '박쥐귀' },
    { value: 3, label: '반직립귀' },
    { value: 4, label: '버튼귀' },
    { value: 5, label: '장미귀' },
    { value: 6, label: '쳐진귀' },
    { value: 7, label: '접힌귀' },
    { value: 8, label: 'V자귀' },
  ];
  const categoryTailOpt = [
    { value: 0, label: '모름' },
    { value: 1, label: '말려있음' },
    { value: 2, label: '펴져있음' },
  ];

  const categoryPatternOpt = [
    { value: 0, label: '모름' },
    { value: 1, label: '솔리드' },
    { value: 2, label: '탄' },
    { value: 3, label: '바이컬러' },
    { value: 4, label: '트라이컬러' },
    { value: 5, label: '턱시도' },
    { value: 6, label: '할리퀸/스팟' },
    { value: 7, label: '브린들' },
    { value: 8, label: '새들' },
    { value: 9, label: '세이블' },
    { value: 10, label: '멀' },
  ];
  const categoryClothOpt = [
    { value: 0, label: '모름' },
    { value: 1, label: '옷입음' },
    { value: 2, label: '안입음' },
  ];

  const categoryClothColorOpt = [
    { value: 0, label: '모름' },
    { value: 1, label: '빨강' },
    { value: 2, label: '파랑' },
  ];

  const openModal = idx => {
    setModalNum(idx);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };
  // Console
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (title === '') {
            setTitleAlertOpen(1);
            titleInput.current.focus();
          }

          mutation();

          // console.log('POST');
        }}
      >
        <div className={styles.container}>
          <div className={styles.title}>
            <input ref={titleInput} type="text" placeholder="글 제목" onChange={e => setTitle(e.target.value)} />
            <div>
              {titleAlertOpen === 0 ? null : (
                <div>
                  <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error" sx={{ fontSize: '15px', color: 'red' }}>
                      제목을 작성해주세요.
                    </Alert>
                  </Stack>
                </div>
              )}
            </div>
          </div>
          <div className={styles['container-info']}>
            <div className={styles['container-info-picture']}>
              <div>
                <div className={styles['container-info-picture-inner']}>
                  {preFile.length === 0 ? (
                    <img className={styles.thumbnail} src={Test} alt="" />
                  ) : (
                    <div>
                      <div className={styles['deleteButton-box']}>
                        <button className={styles.deleteButton} onClick={() => handleDeleteImage(0)}>
                          Delete
                        </button>
                      </div>
                      <img className={styles.thumbnail} src={preFile[0]} alt="" />
                    </div>
                  )}

                  <div className={styles['container-info-picture-inner-sub']}>
                    {preFile.length === 0 || preFile.length === 1 ? (
                      <img className={styles.subPicture} src={Test} alt="" />
                    ) : (
                      <div className={styles['deleteButton-box']}>
                        <button className={styles.deleteButton} onClick={() => handleDeleteImage(1)}>
                          Delete
                        </button>

                        <img className={styles.subPicture} src={preFile[1]} alt={1} />
                      </div>
                    )}
                    {preFile.length === 0 || preFile.length === 1 || preFile.length === 2 ? (
                      <img className={styles.subPicture} src={Test} alt="" />
                    ) : (
                      <div className={styles['deleteButton-box']}>
                        <button className={styles.deleteButton} onClick={() => handleDeleteImage(2)}>
                          Delete
                        </button>

                        <img className={styles.subPicture} src={preFile[2]} alt={2} />
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.pictureButtonCont}>
                  {preFile.length < 3 ? (
                    <label htmlFor="file" onChange={handleAddImages}>
                      <div className={styles.pictureButton}>
                        사진추가
                        <input
                          ref={fileListInput}
                          type="file"
                          id="file"
                          accept="image/*"
                          className={styles.file}
                          multiple
                        />
                      </div>
                    </label>
                  ) : (
                    <div> 3장까지 업로드 가능합니다. </div>
                  )}{' '}
                  {fileListAlertOpen === 0 ? null : (
                    <div>
                      <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error" sx={{ fontSize: '15px', color: 'red' }}>
                          사진을 1장 이상 추가해주세요.
                        </Alert>
                      </Stack>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles['container-info-content']}>
              <div>
                <div>
                  <input ref={nameInput} type="text" placeholder="이름" onChange={e => setName(e.target.value)} />
                  {nameAlertOpen === 0 ? null : (
                    <div>
                      <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error" sx={{ fontSize: '15px', color: 'red' }}>
                          이름을 작성해주세요.
                        </Alert>
                      </Stack>
                    </div>
                  )}
                </div>
                <div>
                  <Select options={stateOpt} onChange={setTypeCode} placeholder="상태" />
                  {titleAlertOpen === 0 ? null : (
                    <div>
                      <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error" sx={{ fontSize: '15px', color: 'red' }}>
                          상태를 선택해주세요.
                        </Alert>
                      </Stack>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div>
                  <Select options={changeBreedList(breedData)} onChange={setBreedId} placeholder="견종" />
                  {titleAlertOpen === 0 ? null : (
                    <div>
                      <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error" sx={{ fontSize: '15px', color: 'red' }}>
                          견종을 선택해주세요.
                        </Alert>
                      </Stack>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div>
                  <div className={styles['container-gender']}>
                    <div className={styles['container-radio']}>
                      <span>성별</span>
                      <div>
                        <input
                          type="radio"
                          value={1}
                          checked={genderCode === 1}
                          onChange={e => setGenderCode(parseInt(e.target.value))}
                        />
                        수컷
                        <input
                          type="radio"
                          value={parseInt(2)}
                          checked={genderCode === 2}
                          onChange={e => setGenderCode(parseInt(e.target.value))}
                        />
                        암컷
                        <input
                          type="radio"
                          value={parseInt(3)}
                          checked={genderCode === 3}
                          onChange={e => setGenderCode(parseInt(e.target.value))}
                        />
                        모름
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <input type="number" placeholder="추정나이" onChange={e => setAge(e.target.value)} />
                </div>
              </div>
              <div>
                <div>
                  <input type="number" placeholder="몸무게" onChange={e => setKg(e.target.value)} />
                </div>
                <div>
                  <div>
                    <Select options={neuteredOpt} onChange={setNeuteredCode} placeholder="중성화" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.subTitle}>카테고리 등록 (선택사항)</div>

        <hr />
        <div className={styles.container}>
          <div className={styles['container-character']}>
            <div>
              <div>
                <img src={infoIcon} alt="" className={styles['info-icon']} onClick={() => openModal(0)} />
                <span>귀</span>
                <div className={styles.categoryIndexEar}>
                  <Select
                    options={categoryEarOpt}
                    onChange={setCategoryEar}
                    defaultValue={categoryEarOpt[categoryEar.value]}
                  />
                </div>
              </div>
              <div>
                <img src={infoIcon} alt="" className={styles['info-icon']} onClick={() => openModal(1)} />
                <span>무늬</span>
                <div className={styles.categoryIndexPat}>
                  <Select
                    options={categoryPatternOpt}
                    onChange={setCategoryPattern}
                    defaultValue={categoryPatternOpt[categoryPattern.value]}
                  />
                </div>
              </div>
              <div>
                <img src={infoIcon} alt="" className={styles['info-icon']} style={{ visibility: 'hidden' }} />
                <span>옷착용</span>
                <div>
                  <Select
                    options={categoryClothOpt}
                    onChange={setCategoryCloth}
                    defaultValue={categoryClothOpt[categoryCloth.value]}
                  />
                </div>
              </div>
            </div>

            <div>
              <div>
                <img src={infoIcon} alt="" className={styles['info-icon']} onClick={() => openModal(2)} />
                <span>꼬리</span>
                <div>
                  <Select
                    options={categoryTailOpt}
                    onChange={setCategoryTail}
                    defaultValue={categoryTailOpt[categoryTail.value]}
                  />
                </div>
              </div>
              <div>
                <img src={infoIcon} alt="" className={styles['info-icon']} style={{ visibility: 'hidden' }} />
                <span>털색</span>
                <div>
                  {categoryPattern.value > 1 ? (
                    <input
                      className={styles.colorPickerHalf}
                      type="color"
                      onChange={e => setCategoryColor(e.target.value)}
                    />
                  ) : (
                    <input
                      className={styles.colorPicker}
                      type="color"
                      onChange={e => setCategoryColor(e.target.value)}
                    />
                  )}
                  {categoryPattern.value > 1 ? (
                    <input
                      className={styles.colorPickerHalf}
                      type="color"
                      onChange={e => setCategoryColor(e.target.value)}
                    />
                  ) : null}
                </div>
              </div>
              <div>
                <img src={infoIcon} alt="" className={styles['info-icon']} style={{ visibility: 'hidden' }} />
                <span>옷색</span>
                <div>
                  <Select
                    options={categoryClothColorOpt}
                    onChange={setCategoryClothColor}
                    defaultValue={categoryClothColorOpt[categoryClothColor.value]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.subTitle}>실종/발견 장소</div>
        <hr />
        {titleAlertOpen === 0 ? null : (
          <div>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="error" sx={{ fontSize: '15px', color: 'red' }}>
                장소를 선택해주세요.
              </Alert>
            </Stack>
          </div>
        )}
        <div className={styles.map}>
          <Map // 지도를 표시할 Container
            center={{
              // 지도의 중심좌표
              lat: 35.95,
              lng: 128.25,
            }}
            style={{
              width: '100%',
              height: '100%',
            }}
            level={13} // 지도의 확대 레벨
            onClick={(_t, mouseEvent) =>
              setPosition({
                lat: mouseEvent.latLng.getLat(),
                lng: mouseEvent.latLng.getLng(),
              })
            }
          >
            {position && (
              <MapMarker
                position={position}
                image={{
                  src: 'https://i.ibb.co/z42FXX4/002-2.png', // 마커이미지의 주소입니다
                  size: {
                    width: 64,
                    height: 64,
                  }, // 마커이미지의 크기입니다
                  options: {
                    offset: {
                      x: 27,
                      y: 69,
                    }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                  },
                }}
              />
            )}
          </Map>
        </div>

        <div className={styles.subTitle}>상세특징</div>
        <hr />
        <div>
          {titleAlertOpen === 0 ? null : (
            <div>
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="error" sx={{ fontSize: '15px', color: 'red' }}>
                  상세특징을 입력해주세요.
                </Alert>
              </Stack>
            </div>
          )}
          <div className={styles.ckEditor}>
            <CKEditor
              editor={ClassicEditor}
              onReady={editor => {
                // You can store the "editor" and use when it is needed.
                // console.log('Editor is ready to use!', editor);
              }}
              config={{
                placeholder: '실종견/임보견 상세정보',
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                // console.log({ event, editor, data });
                setContent(data);
              }}
            />
          </div>
        </div>
        <hr />
        <div>
          <Navbar>
            <button type="submit">등록</button>
            <MenuLink move="/report/" value="취소" />
          </Navbar>
        </div>
      </form>
      {/* Modal  */}
      <DetailModal
        open={modal}
        close={closeModal}
        title={modalNum === 0 ? '귀 모양 상세' : modalNum === 1 ? '무늬 상세' : '꼬리 모양 상세'}
      >
        {modalNum === 0 ? <EarDetail /> : modalNum === 1 ? <PatternDetail /> : <TailDetail />}
      </DetailModal>
    </div>
  );
}
