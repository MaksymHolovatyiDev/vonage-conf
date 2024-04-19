import { useEffect, useState } from "react";
import { Publisher as PB, Session } from "@opentok/client";

// Error handler
import { handleError } from "@/utils";

// Constants
import { FilterOptions } from "@/utils/constants";

interface IProps{
  id?: string;
  className?: string;
  session?: Session;
  video?: boolean;
  token: string;
  filter?: FilterOptions.blur | FilterOptions.image | FilterOptions.none;
  value?: number | string; 
  setPublisher?: (data: PB)=>void;
}

const Publisher = ({id, className, session, video = true, token, filter, value, setPublisher}: IProps) => {
  const [mainPublisher, setMainPublisher] = useState<PB>();
  
  useEffect(()=>{
    if(!token) return;

    const publisher = OT.initPublisher(id || 'publisher', {
      insertMode: 'append',
      width: '100%',
      height: '100%',

      style:{buttonDisplayMode: 'off'}
    }, handleError);

    setMainPublisher(publisher);

    if(setPublisher) setPublisher(publisher);
    
    if(!session) return;

    session.connect(token, function(error) {
      if (error) {
        handleError(error);
      } else {
        session.publish(publisher, handleError);
      }
    });
  }, []);

  useEffect(()=>{
    if(!mainPublisher) return;

    mainPublisher.publishVideo(video);
  }, [video]);

  useEffect(()=>{
    if(!mainPublisher) return;

    switch(filter){
      case FilterOptions.blur:
        mainPublisher.applyVideoFilter({
          type: 'backgroundBlur',
          blurStrength: value ? 'high' : 'low',
        })
        break;
       case FilterOptions.image:
          if(typeof value === "string")
          mainPublisher.applyVideoFilter({
            type: 'backgroundReplacement',
            backgroundImgUrl: value,
          })
          break;
        case FilterOptions.none: 
          mainPublisher.clearVideoFilter();
          break;
    }
  }, [filter, value]);

  return <div className={className} id={id || "publisher"}/>
}

export default Publisher;