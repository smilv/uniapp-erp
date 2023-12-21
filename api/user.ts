import { defRequest } from '@/utils/http/request';
import type { LoginParams, LoginModel } from '@/api/types/user';

export const login = (params: LoginParams) =>
	defRequest.post<LoginModel>({
		url: 'http://api.test.googutspirits.com/rbac/login/login',
		data: params,
	});

export const loginInfo = () =>
	defRequest.post<LoginModel>({
		url: 'http://api.test.googutspirits.com/rbac/login/loginDetail',
	});
