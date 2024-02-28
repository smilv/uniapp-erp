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

function pagePermission(pageRoles: string[], url: undefined | string) {
	if (url === undefined) return true;
	if (url) {
		url = url.split('?')[0];
		return pageRoles.includes(url);
	}
}

export async function hasPermission(e: undefined | Record<string, any>) {
	const url = e?.url;
	const hasToken = getToken();
	const userStore = useUserStore();
	const permissionStore = usePermissionStore();
	if (hasToken) {
		if (url === '/pages/login/login') {
		} else {
			const userInfo = userStore.userInfo;
			const menuTree = permissionStore.menuTree;
			const pageRoles = permissionStore.pageRoles;
			if (userInfo && menuTree) {
				const hasPagePermission = pagePermission(pageRoles, url);
				if (!hasPagePermission) {
					uni.showToast({
						title: '无权限',
						icon: 'error',
					});
					return false;
				}
			} else {
				try {
					await userStore.getInfo();
					await permissionStore.generateMenu();
				} catch (e) {
					userStore.resetToken();
					navigateToLogin();
				}
			}
		}
	} else {
		if (url && whiteTest(url)) {
		} else {
			navigateToLogin();
		}
	}
	return e;
}

export function createPermission() {
	apiNameList.forEach((item) => {
		uni.addInterceptor(item, {
			async invoke(e) {
				const res = await hasPermission(e);
				return res;
			},
		});
	});
}
