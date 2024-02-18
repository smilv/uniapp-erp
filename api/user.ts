import { defRequest } from '@/utils/http/request';
import type { LoginParams, LoginModel } from '@/api/types/user';
import apiHost from '@/config/env';

export const login = (params: LoginParams) =>
	defRequest.post<LoginModel>({
		url: apiHost.gateway + '/rbac/login/login',
		data: params,
	});

export const loginInfo = () =>
	defRequest.post({
		url: apiHost.gateway + '/rbac/login/loginDetail',
	});

export const sendAliVerifyCode = (params: any) =>
	defRequest.post({
		url: apiHost.gateway + '/configuration/center/staff/sendAliVerifyCode',
		data: params,
	});

export const logout = () =>
	defRequest.post({
		url: apiHost.gateway + '/rbac/login/loginOut',
	});

export const getRoleTree = () =>
	defRequest.post({
		url: apiHost.gateway + '/rbac/menu/getRoleTree',
		data: { attributionTerminal: 1 },
	});
