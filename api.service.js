import axios from "axios";
import axiosRetry from 'axios-retry';
import { BASE_PATH } from './constants';
import {app} from "./main";

axiosRetry(axios, { retries: 2 });

axios.interceptors.response.use(response => response, function (error) {
  if (error.response.status == 500) {
    app.$toast.error(app.$t('messages.unexpected_error'));
    return error.response;
  }
  return Promise.reject(error);
});

export const CopyMasterService = {
  query(params) {
    return axios.get(`${BASE_PATH}/api/master`, {params});
  },
  search(params) {
    return axios.get(`${BASE_PATH}/api/master/search`, {params});
  },
};

export const WatchlistService = {
  getAll() {
    return axios.get(`${BASE_PATH}/api/watchlist`);
  },
  create(data) {
    return axios.post(`${BASE_PATH}/api/watchlist`, data);
  },
  delete(id) {
    return axios.delete(`${BASE_PATH}/api/watchlist/${id}`);
  },
  patch(id, data) {
    return axios.patch(`${BASE_PATH}/api/watchlist/${id}`, data);
  },
};
