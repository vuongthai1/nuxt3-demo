<template lang="html">
    <div class="message">
        <i class="ri-search-2-line" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
export default {
    name: "ErrorMessage",
    props: {
        message: {
            type: String,
            default: () => "Something went wrong, please try again."
        },
        align: {
            type: String,
            default: () => "left"
        }
    }
}
</script>

<style lang="scss">
.message {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    i {
        font-size: 4.8rem;
        color: alpha(var(--color-heading), 0.2);
    }
    p {
        font-weight: 600;
        font-size: 1.4rem;
    }
}
</style>
