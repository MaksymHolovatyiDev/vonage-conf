import Publisher from "../../components/Publisher";
import Subscriber from "../../components/Subscriber";
import OT from "@opentok/client";
import Chat from "../../components/Chat";
import styles from "./index.module.scss";

import { Session } from "@opentok/client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
// import { getUserSession } from "@/services/axios";
import { io } from "socket.io-client";

const apiKey = import.meta.env.VITE_API_KEY;
const socket = io("http://localhost:8000");

const CallRoom = () => {
    const params = useParams();
    const [search] = useSearchParams();

    const [response, setResponse] = useState({_id: "", name: "", sessionId: "", token: "", chat: []});
    const [session, setSession] = useState<Session>();

    // useEffect(()=>{
    //   getUserSession(search.get("name") || "", params?.id)
    //   .then(res=>{
    //     if(res?._id)
    //       socket.emit('init', {token: res?.token, id: res._id});

    //     setResponse(res); 
    //     setSession(OT.initSession(apiKey, res.sessionId))});
    // }, []);

    return session &&
      <div className={styles.room}>
        <div id="videos">
            <Publisher session={session} token={response?.token} />
            <Subscriber session={session}/>
            <div id="screen-preview"/>
        </div>
        <Chat 
          chat={response.chat} 
          name={search.get("name") || ""} 
          socket={socket} session={session} 
          roomId={params?.id || response._id} 
          token={response.token}/>
      </div> 

}

export default CallRoom;