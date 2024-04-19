export const MIN_PASSWORD_LENGTH = 6;

export enum FilterOptions {
    blur = "blur",
    image = " image", 
    none = "none",
  }

  export enum LocalStorageKeys {
    token = "token",
  }

  // Thunk prefix
  export enum UserThunkPrefix {
    signIn = "user/SignIn",
    signUp = "user/SignUp"
  }
  export enum SessionThunkPrefix {
    getSession = "session/getSession",
  }

  export enum SettingsTabs {
    device = "Device Settings",
    notification = "Notification",
  }