import {
  CardWrapper, 
  ThumbnailImage,
  CardBody, 
  CardTitle} from '../../../styles/LandmarkCard'
import { 
  SmallLandmarkCard,
  SmallThumbnailImage,
  SmallCardBody, 
  SmallCardTitle,
  SmallCardText } from '../../../styles/SmallLandmarkCard';

import { useEffect, useState} from 'react';
import {apiGet} from '../../../api/openTripMap/apiGet'

export function LandmarkCard(props) {
  const [landmarkDescription, setLandmarkDescription] = useState();
  const [landmarkImageSrc, setLandmarkImageSrc] = useState();
  const [listType, setListType] = useState("list");

  // Runs on ComponentDidMount once and will set the landmark image/description
  useEffect(() => {
    if(props.id){
      props.location === "/day_planner" ? setListType("planner") : setListType("list")
      const timer = setTimeout(() => {
        apiGet("xid/" + props.id).then(data => {
          if (data.preview) setLandmarkImageSrc(data.preview.source)
          setLandmarkDescription(data.wikipedia_extracts
          ? data.wikipedia_extracts.text
          : data.info
          ? data.info.descr
          : "No description")
          })
        }, (500));
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id]);

  return (
      <>
      {listType === "list" ?
        <CardWrapper>
          <ThumbnailImage src={landmarkImageSrc}/>
          <CardBody>
            <CardTitle>{props.name}</CardTitle>
            <p>{landmarkDescription}</p>
          </CardBody>
        </CardWrapper>:
        <SmallLandmarkCard>
          <SmallThumbnailImage src={landmarkImageSrc}/>
          <SmallCardBody>
            <SmallCardTitle>{props.name}</SmallCardTitle>
            <SmallCardText>{landmarkDescription}</SmallCardText>
          </SmallCardBody>
        </SmallLandmarkCard>
        }
      </>
  );
}