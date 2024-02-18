/**
 * @description 路由拦截，添加权限
 */

import { getToken } from './auth';
import { parametersPattern } from '@/utils/pattern';
import { useUserStore } from '@/store/modules/user';
import { usePermissionStore } from '@/store/modules/permission';
const whiteList = ['/', /\/login\/login$/];
const apiNameList = ['navigateTo', 'redirectTo', 'reLaunch'];

/**
 * @description: 验证当前url是否在白名单中
 * @param {string} url    - url
 * @return {boolean}
 */
const whiteTest = (url: string): boolean => {
	let parameters = url.match(parametersPattern)[0];
	let result = whiteList.find((item) => {
		if (typeof item === 'string') {
			return item === parameters;
		} else if (item instanceof RegExp) {
			return item.test(parameters);
		}
	});
	return !!result;
};

function navigateToLogin() {
	uni.navigateTo({
		url: '/pages/login/login',
	});
}

export function hasPermission(url?: string) {
	const hasToken = getToken();
	const userStore = useUserStore();
	const permissionStore = usePermissionStore();
	if (hasToken) {
		if (url === '/pages/login/login') {
		} else {
			const menuTree = permissionStore.menuTree;
			if (menuTree) {
			} else {
				try {
					userStore.getInfo();
					permissionStore.getMenuTree();
				} catch (e) {
					userStore.resetToken();
					navigateToLogin();
					return false;
				}
			}
		}
	} else {
		if (url && whiteTest(url)) {
		} else {
			navigateToLogin();
			return false;
		}
	}
}

export function createPermission() {
	apiNameList.forEach((item) => {
		uni.addInterceptor(item, {
			invoke(e) {
				console.log(e.url);
				return hasPermission(e.url);
			},
		});
	});
}