<template lang="html">
    <div class="label--number">
        <div class="label__wrap" :class="`label__${color}`">
            {{ number }}
        </div>
    </div>
</template>

<script>
export default {
    name: "NumberLabel",
    props: {
        number: {
            type: Number,
            default: 0
        },
        color: {
            type: String,
            default: "default"
        }
    }
}
</script>

<style lang="scss" scoped>
.label {
    &__wrap {
        font-size: 1.6rem;
        font-weight: 600;
        color: var(--color-black);
        background-color: var(--color-yellow);
        width: 3.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.6rem;

        &.label__green {
            background-color: var(--color-green);
        }
        &.label__yellow {
            background-color: var(--color-yellow);
        }
    }
}
</style>
