<!--  -->
<template>
	<div class="container">
		<div class="img_container">
			<div class="login_box">
				<h1>登录</h1>
				<div class="login_item">
					<!-- 登陆的表单项 -->
					<el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules">
						<el-form-item prop="username">
							<el-input v-model="ruleForm.username" placeholder="请输入用户名">
								<template #prefix>
									<el-icon>
										<User />
									</el-icon>
								</template>
							</el-input>
						</el-form-item>
						<el-form-item prop="password">
							<el-input v-model="ruleForm.password" type="password" placeholder="请输入密码">
								<template #prefix>
									<el-icon>
										<Lock />
									</el-icon>
								</template>
							</el-input>
						</el-form-item>
					</el-form>

					<div class="btns">
						<el-button color="#2b4b6b" @click="login">登录</el-button>
						<el-button type="info" plain @click="reset">重置</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from "vue";
import { useRouter } from "vue-router";
const state = reactive({
	ruleForm: {
		username: "",
		password: "",
	},
});
//校验密码的规则
const validatePass = (rule: unknown, value: string | undefined, cb: (msg?: string) => void) => {
	if (!value) {
		cb("密码不能为空");
	} else {
		cb();
	}
};
//校验用户名和密码
const rules = reactive({
	username: [
		{ required: true, message: "用户名不能为空！", trigger: "blur" },
		{ min: 6, max: 12, message: "长度在6到12之间", trigger: "blur" },
	],
	password: [
		{ validator: validatePass, trigger: "blur" },
		{ min: 6, max: 12, message: "长度在6到12之间", trigger: "blur" },
	],
});
//获得表单
let { ruleForm } = toRefs(state);
//获得组件对象
let ruleFormRef = ref();

//获得路由对象
let router = useRouter();
//点击登录按钮触发
const login = () => {
	ruleFormRef.value
		.validate()
		.then(() => {
			//发送登录请求
			console.log("校验成功");
			router.push("/home");
		})
		.catch(() => {
			console.log("校验不通过");
		});
};
//点击重置按钮触发
const reset = () => {
	//响应式对象要写.value
	ruleForm.value.username = "";
	ruleForm.value.password = "";
};
</script>

<style lang="less" scoped>
@media (min-width: 767px) {
	.container {
		background-color: #2b4b6b;
		height: 100%;

		.img_container {
			width: 80%;
			height: 90%;
			position: absolute;
			top: 5%;
			left: 50%;
			transform: translate(-50%);
			border-radius: 20px;
			background: url("../../assets/login_two.jpg") no-repeat;
			background-size: 90% 100%;
			// 这个写在上面就不行 写在下面就可以 神奇
			background-color: #fff;

			.login_box {
				position: relative;
				left: 50%;
				top: 20%;
				width: 30vw;
				height: 200px;

				h1 {
					color: #2b4b6b;
					text-align: center;
					margin-bottom: 50px;
				}

				.login_item {
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.el-form {
						width: 100%;

						.el-input {
							height: 50px;
						}
					}

					.btns {
						display: flex;
						justify-content: flex-end;

						.el-button {
							height: 40px;
							width: 100px;
						}
					}
				}
			}
		}
	}
}

@media (max-width: 766px) {
	.container {
		height: 100vh;
		width: 100vw;
		background: url("../../assets/login_bg_phone.png") no-repeat;
		background-size: 100% 100%;

		.login_box {
			position: relative;
			top: 50px;

			h1 {
				color: #fff;
				text-align: center;
				font-size: 25px;
				margin: 0%;
				margin-bottom: 20px;
			}

			.login_item {
				background-color: rgba(255, 255, 255, 0.3);
				border-radius: 20px;
				height: 220px;
				width: 80%;
				position: relative;
				left: 50%;
				transform: translate(-50%);
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;

				.el-form {
					width: 90%;

					.el-input {
						width: 100%;
						height: 40px;
						margin-bottom: 5px;
					}
				}
			}
		}
	}
}
</style>
