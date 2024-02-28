<!-- 
 * @Description 菜单
 -->
<script setup lang="ts" name="SidebarItem">
	import type { Menu } from '@/mock/menu-tree';
	import SidebarItem from './SidebarItem';
	const props = defineProps<{
		data: Menu;
		path: string;
	}>();
	function triggerCollapse(item: Menu) {
		if (item.children && !item.hideChildrenMenu) {
			item.open = !item.open;
		} else {
			let url = `${props.path}${item.redirect}`;
			uni.navigateTo({
				url,
			});
		}
	}
</script>
<template>
	<view>
		<view class="flex justify-between p-t-15rpx p-b-15rpx" @click="triggerCollapse(data)">
			<view class="p-l-20rpx">
				<text>{{ data.name }}</text>
			</view>
			<view class="m-r-20rpx">
				<template v-if="data.children && !data.hideChildrenMenu">
					<uni-icons type="top" size="14" color="#999" v-show="data.open"></uni-icons>
					<uni-icons type="bottom" size="14" color="#999" v-show="!data.open"></uni-icons>
				</template>
				<template v-else>
					<uni-icons type="right" size="14" color="#999"></uni-icons>
				</template>
			</view>
		</view>
		<view class="p-l-20rpx">
			<SidebarItem
				v-for="(item, index) in data.children"
				:key="index"
				:data="item"
				:path="`${path}${item.path}`"
				v-show="data.open"
			/>
		</view>
	</view>
</template>
<style lang="scss">
</style>
