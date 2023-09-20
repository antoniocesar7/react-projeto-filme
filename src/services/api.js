import axios from 'axios';
//BASE DA URL:https://api.themoviedb.org/3/
//URL DA API: /movie/now_playing?api_key=501a66414a43cb1afdf43e792064408d&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;

