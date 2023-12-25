import { defineStore } from 'pinia';
import { login, logout } from '@/api/user';
import { setToken, getToken, removeToken } from '@/utils/auth';
import type { LoginParams } from '@/api/types/user';

export const useUserStore = defineStore('user', {
	state: () => ({
		token: getToken(),
	}),
	actions: {
		setToken(info: string) {
			this.token = info;
		},
		async login(params: LoginParams) {
			try {
				const data = await login(params);
				const { token } = data.data;
				this.setToken(token);
				setToken(token);
				return Promise.resolve(data);
			} catch (e) {
				return Promise.reject(e);
			}
		},
		async logout() {
			try {
				const data = await logout();
				this.setToken('');
				removeToken();
				return Promise.resolve(data);
			} catch (e) {
				return Promise.reject(e);
			}
		},
	},
});
