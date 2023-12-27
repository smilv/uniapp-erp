/**
 * @description 路由拦截，添加权限
 */

import { getToken } from './auth';
import { parametersPattern } from '@/utils/pattern';
const whiteList = ['/', /\/login\/login$/];
const apiNameList = ['navigateTo', 'redirectTo', 'reLaunch'];

apiNameList.forEach((item) => {
	uni.addInterceptor(item, {
		invoke(e) {
			const hasToken = getToken();
			if (hasToken) {
				//todo
			} else {
				if (whiteTest(e.url)) {
					return true;
				} else {
					uni.reLaunch({
						url: '/pages/login/login',
					});
					return false;
				}
			}
		},
	});
});

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
