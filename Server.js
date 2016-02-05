'use strict';

export const host = 'http://aprs.lussa.net';
export default {
  doctor: {
    create: function (data) {
      let url = `${host}/doctor`,
          opt = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          };

      return fetch(url, opt);
    },
    find: function () {
      let url = `${host}/doctor`,
          opt = {
            method: 'get'
          };

      return fetch(url, opt);
    },
    findOne: function (id) {
      let url = `${host}/doctor/${id}`,
          opt = {
            method: 'get'
          };

      return fetch(url, opt);
    },
    update: function (id, data) {
      let url = `${host}/doctor/${id}`,
          opt = {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          };

      return fetch(url, opt);
    },
    destroy: function (id) {
      let url = `${host}/doctor/${id}`,
          opt = {
            method: 'delete'
          };

      return fetch(url, opt);
    }
  }
};
