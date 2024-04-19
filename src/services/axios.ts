import axios from "axios";
import Notiflix from 'notiflix';

axios.defaults.baseURL = "http://localhost:8000/api";

axios.interceptors.response.use(
    response => response, 
    error => {
        if(error?.response?.data?.message)
            Notiflix.Notify.failure(
                error.response.data.message,
                {clickToClose: true}
            );

        throw new Error(error);
    }
);

export default axios;