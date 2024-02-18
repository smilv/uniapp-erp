import { defineStore } from 'pinia';
import { getRoleTree } from '@/api/user';

export const usePermissionStore = defineStore('permission', {
	state: () => ({
		menuTree: null,
	}),
	actions: {
		setMenuTree(data: null | any[]) {
			this.menuTree = data;
		},
		async getMenuTree() {
			try {
				const data = await getRoleTree();
				this.menuTree = data.data;
				return Promise.resolve(data.data);
			} catch (e) {
				return Promise.reject(e);
			}
		},
	},
});
