<template>
    <div class="container" id="container">
        <!-- <div class="login-container">
            <img class="portrait-img" src="@/assets/img/cc.png" />
            <p class="register">前去注册</p>
            <el-input
                placeholder="请输用户名"
                prefix-icon="el-icon-user-solid"
                v-model="user"
            >
            </el-input>
            <el-input
                placeholder="请输密码"
                prefix-icon="el-icon-lock"
                v-model="password"
                show-password
            >
            </el-input>
            <el-button type="primary" @click="$router.push('/home')">登录</el-button>
        </div> -->
        <div class="form-container sign-up-container">
            <form action="#">
                <h1>使用手机号注册</h1>
                <span>或使用您的电子邮箱注册</span>
                <el-input
                    placeholder="请输用户名"
                    prefix-icon="el-icon-user-solid"
                    v-model="user"
                >
                </el-input>
                <el-input
                    placeholder="请输密码"
                    prefix-icon="el-icon-lock"
                    v-model="password"
                    show-password
                >
                </el-input>
                <button>注册</button>
            </form>
        </div>

        <div class="form-container sign-in-container" v-if="!erCode">
            <p class="switch-ercode" @click="switchErcode">点击二维码登录</p>
            <form action="#">
                <h1>账号密码登录</h1>
                <span>或用二维码登录</span>
                <el-input
                    placeholder="请输用户名"
                    prefix-icon="el-icon-user-solid"
                    v-model="user"
                >
                </el-input>
                <el-input
                    placeholder="请输密码"
                    prefix-icon="el-icon-lock"
                    v-model="password"
                    show-password
                >
                </el-input>
                <button @click="$router.push('/home')">登录</button>
            </form>
        </div>
        <div class="form-container sign-in-container" v-else>
            <p class="switch-ercode" @click="switchErcode">点击账号密码登录</p>
            <form action="#">
                <img :src="'http://qr.liantu.com/api.php?&w=200&fg=ff4b2b&text='+codeText">
            </form>
        </div>

        <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-left">
                    <h1>欢迎回来</h1>
                    <p>与我们保持联系请登录您的个人信息</p>
                    <button class="ghost" id="signIn">前往登录</button>
                </div>
                <div class="overlay-panel overlay-right">
                    <h1>欢迎使用</h1>
                    <p>输入您的个人资料，并与我们一起开始旅程</p>
                    <button class="ghost" id="signUp">前往注册</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index',
    layout: 'login',
    data() {
        return {
            user: '',
            password: '',
            erCode: false,
            codeText: "handong"
        }
    },
    methods: {
        switchErcode() {
            this.erCode = !this.erCode
        }
    },
    mounted() {
        const signUpButton = document.getElementById('signUp')
        const signInButton = document.getElementById('signIn')
        const container = document.getElementById('container')

        signUpButton.addEventListener('click', () => {
            container.classList.add('right-panel-active')
        })

        signInButton.addEventListener('click', () => {
            container.classList.remove('right-panel-active')
        })
    }
}
</script>

<style scoped>
.switch-ercode {
    position: absolute;
    color: #ff4b2b;
    cursor: pointer;
}
.overlay-panel h1,
.overlay-panel p {
    text-shadow: 2px 2px 4px #000;
    margin: 10px 0;
}
.el-input {
    margin: 10px 0 10px 0 !important;
}
.container {
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: absolute;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
    opacity: 0.8;
}

.form-container form {
    background: rgba(45, 52, 54, 1);
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.form-container input {
    background: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
}

button {
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background: #ff4b2b;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}

input[type='text'] {
    width: 240px;
    text-align: center;
    background: transparent;
    border: none;
    border-bottom: 1px solid #fff;
    font-family: 'PLay', sans-serif;
    font-size: 16px;
    font-weight: 200px;
    padding: 10px 0;
    transition: border 0.5s;
    outline: none;
    color: #fff;
    font-weight: bold;
}

input[type='password'] {
    width: 240px;
    text-align: center;
    background: transparent;
    border: none;
    border-bottom: 1px solid #fff;
    font-family: 'PLay', sans-serif;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 0;
    transition: border 0.5s;
    outline: none;
    color: #fff;
}

input[type='email'] {
    width: 240px;
    text-align: center;
    background: transparent;
    border: none;
    border-bottom: 1px solid #fff;
    font-family: 'PLay', sans-serif;
    font-size: 16px;
    font-weight: 200px;
    padding: 10px 0;
    transition: border 0.5s;
    outline: none;
    color: #fff;
    font-weight: bold;
}

button.ghost {
    background: transparent;
    border-color: #ff4b2b;
    background-color: #ff4b2b;
}

.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
}

.sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
}

.sign-up-container {
    left: 0;
    width: 50%;
    z-index: 1;
    opacity: 0;
}

.overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
}

.overlay {
    background: transparent;
    background: linear-gradient(to right, #ff4b2b, #ff416c) no repeat 0 0 /
        cover;
    color: #fff;
    position: absolute;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.overlay-panel {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 40px;
    height: 100%;
    width: 50%;
    text-align: center;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.overlay-right {
    right: 0;
    transform: translateX(0);
}

.overlay-left {
    transform: translateX(-20%);
}

/*....Animation....*/

/*....Move signin to the right....*/

.container.right-panel-active .sign-in-container {
    transform: translateX(100%);
}

/*....Move overlay to the left....*/

.container.right-panel-active .overlay-container {
    transform: translateX(-100%);
}

/*....Bring sign up over sign in....*/

.container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
}

/*...Move overlay back to right....*/

.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.container.right-panel-active .overlay-left {
    transform: translateX(0);
}

.container.right-panel-active .overlay-right {
    transform: translateX(20%);
}
</style>
