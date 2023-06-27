<template lang="html">
    <span :class="`label ${active ? 'active' : ''}`">
        {{ text }}
    </span>
</template>

<script>
export default {
    name: "StatusLabel",
    props: {
        text: {
            type: String,
            default: "Text"
        },
        type: {
            type: String,
            default: "active"
        }
    },
    computed: {
        active() {
            return this.type === "active"
        }
    }
}
</script>

<style lang="scss" scoped>
.label {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2.4rem;
    min-width: 7.4rem;
    max-width: 8rem;
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
    border-radius: 0.6rem;
    margin: 0 auto;
    height: 2.4rem;
    color: var(--color-danger);
    background-color: alpha(var(--color-danger), 0.2);

    &.active {
        color: var(--color-active);
        background-color: var(--color-bg-active);
    }
}
</style>
