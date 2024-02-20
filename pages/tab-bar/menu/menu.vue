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
	<view class="p-20rpx">
		<SidebarItem v-for="(item, index) in permissionStore.menuTree" :key="index" :data="item" />
	</view>
</template>
<style lang="scss"></style>
