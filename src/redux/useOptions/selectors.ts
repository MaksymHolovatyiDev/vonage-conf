interface UserOptions {
    microOn: boolean;
    videoOn: boolean;
  }
  
  export const getUserOptionsMicro = (state: {userOptions: UserOptions}) => state.userOptions.microOn;
  export const getUserOptionsVideo = (state: {userOptions: UserOptions}) => state.userOptions.videoOn;