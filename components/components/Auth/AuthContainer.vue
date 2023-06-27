<template>
    <section class="page page--signin">
        <div class="page__content">
            <div class="page__content-left" :style="{ backgroundImage: 'url(https://picsum.photos/200/300)' }" />
            <div class="page__content-right">
                <div class="page__logo">
                    <img src="../../../assets/static/img/logo-dark.svg" alt="" />
                </div>
                <div class="page__form">
                    <slot />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "AuthContainer"
}
</script>

<style lang="scss" scoped>
.page--signin {
    height: 100vh;
    .page__content-left {
        height: 100%;
        width: 100%;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .page__content-right {
        width: 46rem;
        height: 100%;
        padding: 6.4rem 4.8rem 0;
        flex-direction: column;
        .page__logo {
            margin-bottom: 12.8rem;
        }
        .page__form {
        }
    }
    .page__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
    }
}
</style>
