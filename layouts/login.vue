<template>
    <div class="login-container">
        <video muted autoplay="autoplay" loop="loop">
            <source src="@/assets/img/background.mp4" />
        </video>
        <nuxt />
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: 'login'
        }
    },
    components: {}
}
</script>

<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90vh;
    margin: -20px 0 50px;
    background-size: cover;
}
video {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: -100;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    transform: translate(-50%, -50%);
}

</style>
