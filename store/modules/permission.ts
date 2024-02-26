import { defineStore } from 'pinia';
import { getRoleTree } from '@/api/user';
import { menuTreeMock, MenuTree } from '@/mock/menu-tree';

/**
 * @description 将接口菜单转换为页面展示菜单、提取按钮权限
 * @return
 */
function filterAsyncMenu(data: MenuTree) {
	return { menuTree: data, btnRoles: [] };
}

export const usePermissionStore = defineStore('permission', {
	state: () => ({
		menuTree: null, //菜单树
		btnRoles: [], //按钮权限
	}),
	actions: {
		async generateMenu() {
			try {
				const data = await getRoleTree();
				// 接口数据不规范，用自己造的数据
				// this.menuTree = data.data;
				const { menuTree, btnRoles } = filterAsyncMenu(menuTreeMock);
				this.menuTree = menuTree;
				this.btnRoles = btnRoles;
				return Promise.resolve(data.data);
			} catch (e) {
				return Promise.reject(e);
			}
		},
	},
});
