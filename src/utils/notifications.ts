import Notiflix from "notiflix";

export const failureNotificationMessage = (message: string) => {
    Notiflix.Notify.failure(
        message,
        {clickToClose: true}
    );
}