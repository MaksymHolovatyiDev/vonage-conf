import { useEffect } from "react";
import { Session } from "@opentok/client";
import { handleError } from "../../utils";


interface IProps{
  session: Session;
}

const Subscriber = ({session}: IProps) => {
  useEffect(()=>{
    session.on('streamCreated', function(event) {
     session.subscribe(event.stream, 'subscriber', {
       insertMode: 'append',
       width: '100%',
       height: '100%'
     }, handleError);
   });
  }, []);


  return <div id="subscriber"/>
}

export default Subscriber;