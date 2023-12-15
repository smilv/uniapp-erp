<script setup lang="ts">
	import { computed, reactive, ref } from 'vue';
	const CODE_TIME = 30;
	const tabList = [
		{ label: "账号登录", value: 1 },
		{ label: "手机登录", value: 2 },
	];
	const tabActive = ref(1);
	const accFormData = reactive({
		loginName: "",
		passWord: ""
	})
	const accRules = reactive({
		loginName: {
			rules: [{
				required: true,
				errorMessage: "请输入账号"
			},
			]
		},
		passWord: {
			rules: [{
				required: true,
				errorMessage: "请输入密码"
			}]
		}
	})
	const phoneFormData = reactive({
		loginName: "",
		passWord: ""
	})
	const phoneRules = reactive({
		loginName: {
			rules: [{
				required: true,
				errorMessage: "请输入手机号"
			},
			]
		},
		passWord: {
			rules: [{
				required: true,
				errorMessage: "请输入验证码"
			}]
		}
	})
	const accFormRef = ref();
	const phoneFormRef = ref();
	const codeTime = ref(CODE_TIME); //验证码倒计时
	//验证码按钮不可点击
	const codeDisabled = computed(() => {
		if (codeTime.value !== CODE_TIME || phoneFormData.loginName.length !== 11) return true;
		return false;
	})
	function changeTab(val : number) {
		tabActive.value = val;
	}
	function getCode() {
		codeTime.value--;
		const timer = setInterval(() => {
			codeTime.value--;
			if (codeTime.value < 0) {
				codeTime.value = CODE_TIME;
				clearInterval(timer)
			}
		}, 1000)
	}
	function submit() {
		accFormRef.value.validate()
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
		<swiper class="swiper" :autoplay="false" :disable-touch="true" :current="tabActive-1" :duration="300">
			<swiper-item>
				<view class="swiper-item">
					<uni-forms ref="accFormRef" :rules="accRules" :modelValue="accFormData" :label-width="0">
						<uni-forms-item name="loginName">
							<uni-easyinput v-model.trim="accFormData.loginName" placeholder="请输入账号" />
						</uni-forms-item>
						<uni-forms-item name="passWord">
							<uni-easyinput v-model.trim="accFormData.passWord" placeholder="请输入密码" type="password" />
						</uni-forms-item>
					</uni-forms>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<uni-forms ref="phoneFormRef" :rules="phoneRules" :modelValue="phoneFormData" :label-width="0">
						<uni-forms-item name="loginName">
							<uni-easyinput v-model.trim="phoneFormData.loginName" placeholder="请输入手机号" type="number"
								:maxlength="11" />
						</uni-forms-item>
						<uni-forms-item name="passWord">
							<uni-easyinput v-model.trim="phoneFormData.passWord" placeholder="请输入验证码" type="number" :maxlength="6" />
						</uni-forms-item>
					</uni-forms>
					<view class="uni-flex justify-end">
						<button class="uni-btn w-200rpx" type="primary" size="mini" :disabled="codeDisabled"
							@click="getCode">{{codeTime!==CODE_TIME?`${codeTime}s`:'获取验证码'}}</button>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<button type="primary" class="uni-btn" @click="submit">登录</button>
	</view>
</template>
<style lang="scss">
	page {
		background-color: white;
	}

	.tab-title {
		display: flex;
		justify-content: center;
		padding-top: 26%;
		font-size: 40rpx;
		color: $uni-secondary-color;
		height: 80rpx;

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

	.swiper {
		margin-top: 100rpx;
		height: 340rpx;

		.swiper-item {
			padding: 0 5rpx;
			display: block;
		}
	}
</style>