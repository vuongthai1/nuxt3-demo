<template lang="html">
    <div class="card--content">
        <div class="card__top">
            <h4>{{ title }}</h4>
        </div>
        <div class="card__container">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: "ContentCard",
    props: {
        title: {
            type: String,
            default: "Name"
        }
    }
}
</script>
<style lang="scss" scoped>
.card--content {
    border-radius: 0.8rem;
    overflow: hidden;
    background: none;

    .card__top {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1px solid alpha(var(--color-border), 0.1);
        padding-bottom: 1.6rem;
        h4 {
            margin-bottom: 0;
            font-size: 1.4rem;
            font-weight: 400;
            color: var(--color-heading);
        }
    }

    .card__container {
        padding: 1.6rem 2rem;
        border-radius: 0.4rem;
        border: 1px solid #eaeaea;
    }
}
</style>
