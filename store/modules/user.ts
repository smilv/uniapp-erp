import { defineStore } from 'pinia';
import { login } from "@/api/user";
import type { LoginParams } from "@/api/types/user";

export const useUserStore = defineStore('user', {
	state: () => ({
		count: 0
	}),
	actions: {
		increment() {
			this.count++;
		},
		async login(params : LoginParams) {
			try {
				const data = await login(params);
				return Promise.resolve(data)
			} catch (e) {
				return Promise.reject(e)
			}
		}
	},
});