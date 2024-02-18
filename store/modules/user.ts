import { defineStore } from 'pinia';
import { login, logout, loginInfo } from '@/api/user';
import { setToken, getToken, removeToken } from '@/utils/auth';
import type { LoginParams } from '@/api/types/user';
import { usePermissionStore } from '@/store/modules/permission';

export const useUserStore = defineStore('user', {
	state: () => ({
		token: getToken(),
		userInfo: {},
	}),
	actions: {
		setToken(info: string) {
			this.token = info;
		},
		setUserInfo(info: Record<string, any>) {
			this.userInfo = info;
		},
		async login(params: LoginParams) {
			try {
				const data = await login(params);
				const { token } = data.data;
				this.setToken(token);
				setToken(token);
				return Promise.resolve(data.data);
			} catch (e) {
				return Promise.reject(e);
			}
		},
		async logout() {
			try {
				const data = await logout();
				this.resetToken();
				return Promise.resolve(data);
			} catch (e) {
				return Promise.reject(e);
			}
		},
		async getInfo() {
			try {
				const data = await loginInfo();
				this.setUserInfo(data.data);
				return Promise.resolve(data.data);
			} catch (e) {
				return Promise.reject(e);
			}
		},
		resetToken() {
			const permissionStore = usePermissionStore();
			this.setToken('');
			removeToken();
			this.setUserInfo({});
			permissionStore.setMenuTree(null);
			return Promise.resolve();
		},
	},
});
