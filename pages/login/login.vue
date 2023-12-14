<script setup lang="ts">
	import { ref } from 'vue';
	const tabList = [
		{ label: "账号登录", value: 1 },
		{ label: "手机登录", value: 2 },
	];
	const tabActive = ref(1);
	function changeTab(val : number) {
		tabActive.value = val;
	}
</script>
<template>
	<view class="uni-padding-wrap">
		<view class="tab-title">
			<view :class="{'tab-title__active':tabActive===item.value}" class="tab-title__tab-item"
				v-for="(item,index) in tabList" :key="index" @click="changeTab(item.value)">
				{{item.label}}
			</view>
		</view>
	</view>
</template>
<style lang="scss">
	.tab-title {
		display: flex;
		justify-content: center;
		margin-top: 26%;
		font-size: 40rpx;
		color: $uni-secondary-color;

		&__tab-item {
			margin: 0 20rpx;
			padding: 10rpx 30rpx;
			transition: all .1s;
		}

		&__active {
			color: $uni-primary;
			border-bottom: solid 4rpx $uni-primary;
		}
	}
</style>