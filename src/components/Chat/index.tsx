import classNames from "classnames";
import styles from "./index.module.scss";

import { useEffect, useState } from "react";
import { Button, Input } from "@mui/material";
import { CallEnd, Send, ScreenShare } from "@mui/icons-material";
import { Session } from "@opentok/client";
import { useParams } from "react-router-dom";
// import { disconnectSession } from "../../services/axios";
import { Socket } from "socket.io-client";

interface IProps {
    roomId: string;
    session: Session;
    token: string;
    socket: Socket;
    name: string;
    chat: IMessages[];
}

interface IMessages {
    message: string;
    token: string;
    name: string;
}

const Chat = ({roomId, session, token, socket, name, chat}: IProps) => {
    const params = useParams();

    const [open, setOpen] = useState(false);
    const [messages, setMessages]= useState<IMessages[]>(chat);
    const [userMessage, setUserMessage] = useState("");
    
    useEffect(()=>{
        socket.on('message', (message) => {
            setMessages(prevState=>[...prevState, message])
        });
    },[])

    const endSession = () => {
        session.disconnect();
        // if(!params?.id)
            // disconnectSession(token);
    }
    
    const toggleChat = () => {
        (document.activeElement as any).blur();
        setOpen(prevState => !prevState);
    }

    const onMessageChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserMessage(evt.target.value);
    }

    const onSendClick = (evt: any) =>{
        evt.preventDefault();

        socket.emit('message', {token, message: userMessage, name, id: roomId});

        setUserMessage('');
    }

    const onScreenShare = () =>{
        OT.checkScreenSharingCapability(function(response) {
            if(!response.supported || response.extensionRegistered === false) {
              // This browser does not support screen sharing.
            } else if (response.extensionInstalled === false) {
              // Prompt to install the extension.
            } else {
              // Screen sharing is available. Publish the screen.
              const publisher = OT.initPublisher('screen-preview',
                {videoSource: 'screen'},
                function(error) {
                  if (error) {
                    // Look at error.message to see what went wrong.
                  } else {
                    session.publish(publisher, function(error) {
                      if (error) {
                        // Look error.message to see what went wrong.
                      }
                    });
                  }
                }
              );
            }
          });
    }

    return (
        
        <div className={classNames([styles.chat, {[styles["chat--open"]]: open}])}>
            <div className={classNames([styles["chat-container"], {[styles["chat-container--open"]]: open}])}>
                <button 
                    type="button" 
                    className={classNames([styles["options-button"], {[styles["options-button--open"]]: open}])} 
                    onClick={toggleChat}>. . .</button>
                <div className={styles["chat-wrapper"]}>
                    <p>Room id: {roomId}</p>
                    <div>
                        <Button onClick={endSession}>
                            <CallEnd className={styles["call-ico"]}/>
                        </Button>   
                        <Button onClick={onScreenShare}>
                            <ScreenShare/>
                        </Button>   
                    </div>
                    <div className={styles["chat--list"]}>
                        { messages.map(({ message, name }, idx) => <div key={ idx }><p className={styles["chat--list--name"]}>{name}</p><p>{ message }</p></div>) }
                    </div>
                    <form className={styles["chat--send"]}>
                      <div className={styles["send-input"]}>
                        <Input value={userMessage} onChange={ onMessageChange }/>
                      </div>
                      <div className={styles["send-action"]}>
                        <Button disabled={ !userMessage.length } type="submit" onClick={ onSendClick } variant="contained">
                          <Send/>
                        </Button>
                      </div>
                    </form>
                </div>
            </div>
        </div>);
}

export default Chat;