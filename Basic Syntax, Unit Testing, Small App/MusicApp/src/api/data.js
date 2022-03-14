import * as api from "./api.js";

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllAlbums() {
    return api.get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

export async function createAlbum(album) {
    return api.post(`/data/albums`, album);
}

export async function getAlbumById(albumId) {
    return api.get('/data/albums/' + albumId);
}
export async function getAlbumByName(query) {
    return api.get(`/data/albums?where=name%20LIKE%20%22${query}%22`);
}

export async function editAlbumById(albumId, album) {
    return api.put('/data/albums/' + albumId, album);
}

export async function deleteAlbum(albumId) {
    return api.del('/data/albums/' + albumId);
}
