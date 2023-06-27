<template lang="html">
    <div class="panel">
        <div class="panel__icon">
            <i class="ri-information-line" />
        </div>
        <div class="panel__container">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: "InformationPanel"
}
</script>
<style lang="scss" scoped>
.panel {
    display: grid;
    grid-template-columns: 3.2rem minmax(0, 1fr);
    border: 1px solid alpha(var(--color-gray), 0.06);
    grid-gap: 1.2rem;
    padding: 1.2rem 2.4rem;
    border-radius: 0.6rem;
    width: 100%;
    background-color: #fafafa;

    .panel__icon {
        align-self: start;
        display: flex;
        align-items: flex-start;
        i {
            font-size: 3.2rem;
            color: alpha(var(--color-gray), 0.6);
            line-height: 1em;
        }
    }

    .panel__container {
        p {
            font-size: 1.2rem;
            font-weight: 400;
            margin-bottom: 0.4rem;
            line-height: 1.4em;
            font-style: italic;
            color: var(--color-text);
            strong {
                font-weight: 400;
                color: var(--color-heading);
                font-size: inherit;
            }
        }
    }
}
</style>
