<template lang="html">
    <div class="widget--heading">
        <div class="widget__wrap" :title="heading" :class="`widget__${color}`">{{ heading }}</div>
    </div>
</template>

<script>
export default {
    name: "HeadingWidget",
    props: {
        heading: {
            type: String,
            default: "Heading"
        },
        color: {
            type: String,
            default: "default"
        }
    }
}
</script>

<style lang="scss" scoped>
.widget {
    &__wrap {
        position: relative;
        display: flex;
        padding-left: 2.3rem;
        font-size: 2.2rem;
        font-weight: 600;
        color: var(--color-black);
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 1.1rem;
            height: 100%;
            border-radius: 0.2rem;
            background-color: var(--color-info);
            margin-right: 1.2rem;
        }

        &.widget__orange {
            &::before {
                background-color: var(--color-orange);
            }
        }

        &.widget__purple {
            &::before {
                background-color: var(--color-purple);
            }
        }

        &.widget__green {
            &::before {
                background-color: var(--color-green);
            }
        }
    }
}
</style>
