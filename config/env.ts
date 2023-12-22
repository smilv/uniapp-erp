/**
 * @description 接口环境变量
 */

type ApiHost = {
	gateway: string;
};

const dev = {
	gateway: 'http://api.test.googutspirits.com',
};

const test = {
	gateway: 'http://api.test.googutspirits.com',
};

const prod = {
	gateway: 'http://api.googutspirits.com',
};

const apiHost = {
	dev,
	test,
	prod,
};

export default apiHost[process.env.ENV_TYPE] as ApiHost;
