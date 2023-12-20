import type { RbacResponse } from "./base-model"

/**
 * @description: 请求数据类型
 */
export type LoginParams = {
	loginType : number;
	loginName : string;
	passWord : string
}

/**
 * @description: 返回数据类型
 */
export type LoginModel = RbacResponse<{
	status : number;
	token : string;
}>