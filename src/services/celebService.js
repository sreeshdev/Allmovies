import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/celeb";

function celebUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getCelebs() {
  return http.get(apiEndpoint);
}

export function getCeleb(celebId) {
  return http.get(celebUrl(celebId));
}

export function saveCeleb(celeb) {
  if (celeb._id) {
    const body = { ...celeb };
    delete body._id;
    return http.put(celebUrl(celeb._id), body);
  }

  return http.post(apiEndpoint, celeb);
}

export function deleteCeleb(celebId) {
  return http.delete(celebUrl(celebId));
}
