import { defRequest } from "@/utils/http/request";
import type { LoginParams, LoginModel } from "@/api/types/user";

export const login = (params : LoginParams) => defRequest.post<LoginModel>({
	url: 'http://api.test.googutspirits.com/rbac/login/login', //仅为示例，并非真实接口地址。
	data: params,
});