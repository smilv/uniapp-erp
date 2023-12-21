import { defineStore } from 'pinia';
import { login } from "@/api/user";
import { setToken } from "@/utils/auth";
import type { LoginParams } from "@/api/types/user";

export const useUserStore = defineStore('user', {
	state: () => ({
		token: undefined
	}),
	actions: {
		setToken(info : string | undefined) {
			this.token = info;
			setToken(info);
		},
		async login(params : LoginParams) {
			try {
				const data = await login(params);
				const { token } = data.data;
				this.setToken(token);
				return Promise.resolve(data)
			} catch (e) {
				return Promise.reject(e)
			}
		}
	},
});