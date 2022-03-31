import Vue from 'vue';
import Vuex from 'vuex';
import {
  setToken, getToken, setUserInfo, getUserInfo,
} from '../utils/auth';
import UserModel from '../api/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: getToken() ? getToken() : '',
    userInfo: getUserInfo() ? getUserInfo() : '',
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      setToken(token);
    },
    setUserInfo(state, info) {
      state.userInfo = info;
      setUserInfo(info);
    },
  },
  actions: {
    /**
     * 登录方法
     * @param commit
     * @param payload
     * @returns {Promise<unknown>}
     */
    handleUserLogin({ commit }, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          // 调用登录接口
          const result = await UserModel.userLogin(payload);
          // 获取token
          const { token } = result.data;
          // 将token存储到vuex
          commit('setToken', token);
          // 将登录成功的结果返回出去
          resolve(result);
        } catch (err) {
          reject(err);
        }
      });
    },
    /**
     * 获取用户信息
     * @param commit
     * @returns {Promise<unknown>}
     */
    handleUserInfo({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          // 调用获取用户信息接口
          const result = await UserModel.getUserInfo();
          // 将获取到的用户信息保存到vuex
          commit('setUserInfo', result.data);
          // 将获取成功用户信息返回出去
          resolve(result);
        } catch (err) {
          reject(err);
        }
      });
    },
  },
  modules: {
  },
});
