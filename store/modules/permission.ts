import { defineStore } from 'pinia';
import { getRoleTree } from '@/api/user';
import { menuTreeMock, MenuTree } from '@/mock/menu-tree';

/**
 * @description 提取页面权限、提取按钮权限
 */
function filterAsyncMenu(data: MenuTree, pageRoles = [], btnRoles = [], path = '') {
	data.forEach((item) => {
		if (item.type === 1) {
			path += item.path;
		}
		if (item.children) {
			filterAsyncMenu(item.children, pageRoles, btnRoles, path);
		} else if (item.type === 1) {
			pageRoles.push(path);
		} else if (item.type === 2) {
			btnRoles.push(item.btnRole);
		}
	});
	return { pageRoles, btnRoles };
}

export const usePermissionStore = defineStore('permission', {
	state: () => ({
		menuTree: null, //菜单树
		pageRoles: [], //页面权限
		btnRoles: [], //按钮权限
	}),
	actions: {
		async generateMenu() {
			try {
				const data = await getRoleTree();
				// this.menuTree = data.data;
				// 接口数据不规范，用自己造的数据
				const { pageRoles, btnRoles } = filterAsyncMenu(menuTreeMock);
				this.menuTree = menuTreeMock;
				this.pageRoles = pageRoles;
				this.btnRoles = btnRoles;
				return Promise.resolve(data.data);
			} catch (e) {
				return Promise.reject(e);
			}
		},
	},
});
