import "isomorphic-fetch";

import { apiURL } from "../config";

class api {
  constructor() {
    this.token = "";
  }

  getToken() {
    return this.token;
  }

  setToken(token) {
    this.token = token;
  }

  get(...args) {
    if (args.length === 1) {
      const path = args[0];
      return new Promise(async (resolve, reject) => {
        try {
          const response = await fetch(`${apiURL}${path}`, {
            mode: "cors",
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json", Authorization: `JWT ${this.token}` },
          });

          const res = await response.json();
          resolve(res);
        } catch (e) {
          reject(e);
        }
      });
    }
    else {
      const path = args[0];
      const contentType = args[1];
      return new Promise(async (resolve, reject) => {
        try {
          const response = await fetch(`${apiURL}${path}`, {
            mode: "cors",
            method: "GET",
            credentials: "include",
            headers: {"Content-Type": contentType, Authorization: `JWT ${this.token}` },
          });

          const res = await response;
          resolve(res);
        } catch (e) {
          reject(e);
        }
      });
    }
  }

  put(path, body) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${apiURL}${path}`, {
          mode: "cors",
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json", Authorization: `JWT ${this.token}` },
          body: typeof body === "string" ? body : JSON.stringify(body),
        });

        const res = await response.json();
        resolve(res);
      } catch (e) {
        reject(e);
      }
    });
  }

  remove(path) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${apiURL}${path}`, {
          mode: "cors",
          credentials: "include",
          method: "DELETE",
          headers: { "Content-Type": "application/json", Authorization: `JWT ${this.token}` },
        });
        const res = await response.json();
        resolve(res);
      } catch (e) {
        reject(e);
      }
    });
  }

  post(path, body) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${apiURL}${path}`, {
          mode: "cors",
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json", Authorization: `JWT ${this.token}` },
          body: typeof body === "string" ? body : JSON.stringify(body),
        });

        const res = await response.json();
        if (response.status !== 200) {
          return reject(res);
        }
        resolve(res);
      } catch (e) {
        reject(e);
      }
    });
  }
}

const API = new api();
export default API;
