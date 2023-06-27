<template lang="html">
    <span class="tooltip-customize" :data-tooltip="content"
        ><i class="ri-error-warning-line"></i
    ></span>
</template>
<script>
export default {
    name: "Tooltip",
    props: {
        content: {
            type: String,
            default:
                "Categories for blog articles help organize and classify content on a blog, making it easier for readers to navigate and find articles of interest"
        }
    }
}
</script>

<style lang="scss" scoped>
.v-icon.v-icon {
    font-size: 1.667rem;
}
.tooltip-customize {
    display: block;
    position: relative;
}
.tooltip-customize:hover:after {
    content: attr(data-tooltip);
    position: absolute;
    // left: 50%;
    bottom: 100%;
    transform: translateX(-50%);
    padding: 0.8rem 1.2rem 0.9rem 1rem;
    font-weight: 400;
    font-size: 1rem;
    background-color: var(--color-background-tooltip);
    color: var(--color-bg-gray);
    min-width: 12rem;
    max-width: 30rem;
    // white-space: pre-line;
    border-radius: 0.6rem;
    z-index: 33;
}
</style>
