/**
 * @description 对tabbar页面进行路由拦截
 */
import { onShow } from '@dcloudio/uni-app';
import { hasPermission } from '@/utils/permission';
export function usePermission() {
	onShow(() => {
		hasPermission();
	});
}
