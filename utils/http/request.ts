/**
 * @description: 封装uni.request
 */

class ERequest {
	get<T = any>(options : any) : Promise<T> {
		return this.request({ ...options, method: "GET" })
	}
	post<T = any>(options : any) : Promise<T> {
		return this.request({ ...options, method: "POST" })
	}
	request<T = any>(options : any) : Promise<T> {
		return new Promise((resolve, reject) => {
			uni.request({
				...options,
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
	transResponse(data : any) {
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