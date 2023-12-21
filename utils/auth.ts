import { APP_TOKEN_KEY } from '@/enums/appEnum';

export function getToken() {
	return uni.getStorageSync(APP_TOKEN_KEY);
}

export function setToken(token: string | undefined) {
	uni.setStorageSync(APP_TOKEN_KEY, token);
}

export function removeToken() {
	uni.removeStorageSync(APP_TOKEN_KEY);
}
