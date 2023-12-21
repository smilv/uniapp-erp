/**
 * @description: 封装uni.request
 */

import { parametersLastPattern, rbacPattern } from "@/utils/pattern";
import { uuid } from "@/utils/uuid";
import { setObjToUrlParams } from "@/utils/index";
import { APP_ID, APP_MD5_KEY } from "@/enums/appEnum";
import { getToken } from "@/utils/auth";
import md5 from 'crypto-js/md5';

class ERequest {
	public get<T = any>(options : UniApp.RequestOptions) : Promise<T> {
		return this.request({ ...options, method: "GET" })
	}
	public post<T = any>(options : UniApp.RequestOptions) : Promise<T> {
		return this.request({ ...options, method: "POST" })
	}
	private request<T = any>(options : UniApp.RequestOptions) : Promise<T> {
		return new Promise((resolve, reject) => {
			uni.request({
				...this.transRequest(options),
				success: (res : UniApp.RequestSuccessCallbackResult) => {
					if (res.statusCode == 200) {
						const data = res.data;
						try {
							const ret = this.transResponse(data);
							resolve(ret);
						} catch (err) {
							uni.showToast({
								title: err.message,
								icon: "none"
							})
							reject(data);
						}
					} else {
						uni.showToast({
							title: '网络请求异常',
							icon: "none"
						})
						reject(res)
					}
				}, fail: (err : UniApp.GeneralCallbackResult) => {
					uni.showToast({
						title: '网络请求异常',
						icon: "none"
					})
					reject(err)
				}
			})
		})
	}
	private transRequest(options : UniApp.RequestOptions) {
		const { url, header, data } = options;
		const timeStamp = Date.now();
		const parametersLast = url.match(parametersLastPattern)[1];
		const token = getToken() || "";
		const dataHeader = {
			app_id: APP_ID,
			time_stamp: timeStamp,
			transaction_type: parametersLast,
			token,
			resources_id: -999,
			message_id: uuid()
		};
		if (typeof data === "object" && !(data instanceof ArrayBuffer)) {
			if (data.RESOURCES_ID) {
				dataHeader.resources_id = data.RESOURCES_ID;
				delete data.RESOURCES_ID;
			}
		}
		//兼容rbac接口。token放入Request Headers，body不做处理
		if (rbacPattern.test(url)) {
			options.header = {
				"authorization": token,
				...header
			}
		} else {
			options.data = { header: dataHeader, body: data };
			const queryObj = {
				app_id: APP_ID,
				transaction_type: parametersLast,
				sign: md5(APP_MD5_KEY + JSON.stringify(options.data) + timeStamp).toString(),
			};
			options.url = setObjToUrlParams(url, queryObj);
		}
		return options
	}
	private transResponse(data : any) {
		//网关统一接口
		if (data.header) {
			if (data.header.res_code !== 0) {
				throw new Error(data.header.message);
			}
		}
		//rbac接口
		else if (data.code) {
			if (data.code !== 0) {
				let msg = data.msg;
				if (data.data && data.data.message) {
					msg = data.data.message;
				}
				throw new Error(msg);
			}
		}
		return data;
	};
}

export const defRequest = new ERequest()