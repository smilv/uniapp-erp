<!-- 
 * @Description 菜单
 -->
<script setup lang="ts">
	import SidebarItem from './components/SidebarItem.vue';
	import { usePermissionStore } from '@/store/modules/permission';
	import { usePermission } from '@/hooks/usePermission';
	usePermission();
	const permissionStore = usePermissionStore();
</script>
<template>
	<view class="p-l-20rpx p-r-20rpx">
		<view class="nest-menu" v-for="(item, index) in permissionStore.menuTree" :key="index">
			<SidebarItem :data="item" :path="item.path" />
		</view>
	</view>
</template>
<style lang="scss">
	.nest-menu {
		background: #fff;
		margin: 15rpx 0;
		padding: 10rpx 0;
	}
</style>
