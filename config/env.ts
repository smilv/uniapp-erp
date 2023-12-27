/**
 * @description 接口环境变量
 */

interface ApiHost {
	gateway: string;
}

const dev: ApiHost = {
	gateway: 'http://api.test.googutspirits.com',
};

const test: ApiHost = {
	gateway: 'http://api.test.googutspirits.com',
};

const prod: ApiHost = {
	gateway: 'http://api.googutspirits.com',
};

const apiHost = {
	dev,
	test,
	prod,
};

export default apiHost[process.env.ENV_TYPE] as ApiHost;
