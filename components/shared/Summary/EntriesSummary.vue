<template lang="html">
    <p class="box--summary">
        All <span>({{ total }})</span> | Published <span>({{ published }})</span> | Draft
        <span>({{ draft }})</span>
    </p>
</template>

<script>
export default {
    name: "EntriesSummary",
    props: {
        total: {
            type: Number,
            default: 0
        },
        published: {
            type: Number,
            default: 0
        },
        draft: {
            type: Number,
            default: 0
        }
    }
}
</script>
<style lang="scss" scoped>
.box--summary {
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--color-heading);

    span {
        font-weight: 400;
        color: alpha(var(--color-gray), 0.8);
    }
}
</style>
