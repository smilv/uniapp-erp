<!-- 
 * @Description 菜单
 -->
<script setup lang="ts" name="SidebarItem">
	const props = defineProps<{
		data: Record<string, any>;
	}>();
	function triggerCollapse(item: Record<string, any>) {
		if (item.children) {
			item.open = !item.open;
		}
	}
</script>
<template>
	<view class="nest-menu">
		<view
			class="flex justify-between p-t-30rpx p-b-30rpx"
			:class="data.open && data.resourceLevel === 1 ? 'panel-on' : ''"
			@click="triggerCollapse(data)"
		>
			<view class="p-l-20rpx">
				<text>{{ data.name }}</text>
			</view>
			<view class="m-r-20rpx">
				<template v-if="data.children">
					<uni-icons type="top" size="14" color="#999" v-show="data.open"></uni-icons>
					<uni-icons type="bottom" size="14" color="#999" v-show="!data.open"></uni-icons>
				</template>
				<template v-else>
					<uni-icons type="right" size="14" color="#999"></uni-icons>
				</template>
			</view>
		</view>
		<SidebarItem
			v-for="(item, index) in data.children"
			:key="index"
			:data="item"
			v-show="data.open"
			class="p-l-20rpx"
		/>
	</view>
</template>
<style lang="scss">
	.nest-menu {
		background-color: #fff;
	}
	.panel-on {
		background-color: #f0f0f0;
	}
</style>
