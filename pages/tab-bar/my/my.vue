<!-- 
 * @Description 我的
 -->
<script setup lang="ts">
	import { useUserStore } from '@/store/modules/user';
	import { usePermission } from '@/hooks/usePermission';
	usePermission();
	const userStore = useUserStore();
	function toLogin() {
		uni.navigateTo({
			url: '/pages/login/login',
		});
	}
	function logout() {
		userStore.logout().then(() => {
			toLogin();
		});
	}
</script>
<template>
	<view>
		<view class="user uni-bg-blue">
			<view class="p-t-14rpx">
				<view class="text-16px">歌德盈香股份有限公司</view>
				<view class="m-t-10rpx">{{ userStore.userInfo?.staffName }}</view>
			</view>
			<view>
				<image
					src="https://gdyx-erp.oss-cn-beijing.aliyuncs.com/web-test-file/2023-12-13/9f005be45c334a569a955308d050e939-b6835087-3b83-47bb-8faa-c670d9bad3a4352656483237196734373.jpg"
					class="avatar"
				></image>
			</view>
		</view>
		<button v-if="userStore.token" type="primary" class="uni-btn login" @click="logout">退出登录</button>
		<button v-else type="primary" class="uni-btn login" @click="toLogin">去登录</button>
	</view>
</template>
<style lang="scss">
	.user {
		display: flex;
		justify-content: space-between;
		margin: 0 30rpx;
		padding: 20rpx;
		border-radius: 10rpx;
	}

	.avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 10rpx;
		display: block;
	}

	.login {
		position: fixed;
		bottom: calc(var(--window-bottom));
		width: 60%;
		left: 0;
		right: 0;
		margin: 0 auto 30rpx;
	}
</style>
