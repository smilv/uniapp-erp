/**
 * @description: 封装uni.request
 */
class ERequest {
	get(options : any) {
		return this.request({ ...options, method: "GET" })
	}
	post(options : any) {
		return this.request({ ...options, method: "POST" })
	}
	request(options : any) {
		return uni.request(options)
	}
}

export const defRequest = new ERequest()