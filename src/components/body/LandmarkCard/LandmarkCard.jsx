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
  SmallCardText,
  CardButtons,
  SmallCardHeader } from '../../../styles/SmallLandmarkCard';

import { useEffect, useState} from 'react';
import {apiGet} from '../../../api/openTripMap/apiGet'

import {PopupModal} from './PopupModal'

export function LandmarkCard(props) {
  const [landmarkDescription, setLandmarkDescription] = useState();
  const [landmarkImageSrc, setLandmarkImageSrc] = useState();
  const [listType, setListType] = useState("list");
  const [addEditType, setAddEditType] = useState("add");

  function LandmarkPopup() {
    return (
      <SmallLandmarkCard>
        <SmallThumbnailImage src={landmarkImageSrc}/>
        <SmallCardBody>
          <SmallCardTitle>{props.name}</SmallCardTitle>
          <SmallCardText>{landmarkDescription}</SmallCardText>
        </SmallCardBody>
      </SmallLandmarkCard>
    )
  }

  // Runs on ComponentDidMount once and will set the landmark image/description
  useEffect(() => {
    if(props.xid){
      props.location === "/day_planner" ? setListType("planner") : setListType("list")
      props.type === "itineraryItem" ? setAddEditType("edit") : setAddEditType("add")
      const timer = setTimeout(() => {
        apiGet("xid/" + props.xid).then(data => {
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
  }, [props.xid]);

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

            <SmallCardHeader>
              <div>
                {props.type === "itineraryItem" &&
                  <CardTitle>{props.time}</CardTitle>
                }
              </div>
              <CardButtons>
                <PopupModal 
                  type={'details'}
                  title={props.name}
                  content={landmarkDescription}
                  img_src={landmarkImageSrc}
                />
                <PopupModal 
                  type={addEditType}
                  title={<LandmarkPopup />}
                  name={props.name}
                  id={props.id}
                  xid={props.xid}
                  setItineraryItems={props.setItineraryItems}
                  itineraryItems={props.itineraryItems}
                  setText={props.setText}
                />
              </CardButtons>
            </SmallCardHeader>
            
            <SmallCardTitle>{props.name}</SmallCardTitle>
            <SmallCardText>{landmarkDescription}</SmallCardText>
          </SmallCardBody>
        </SmallLandmarkCard>
        }
      </>
  );
}
