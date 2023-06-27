<template lang="html">
    <div v-if="type === 'success'" class="icon--status icon--success">
        <i class="ri-check-double-line" />
    </div>
    <div v-else-if="type === 'warning'" class="icon--status icon--warning">
        <i class="ri-error-warning-line" />
    </div>
    <div v-else class="icon--status icon--red">
        <i class="ri-delete-bin-6-line" />
    </div>
</template>

<script>
export default {
    name: "StatusIcon",
    props: {
        type: {
            type: String,
            default: "success" // 'success' | 'warning' | 'danger'
        }
    }
}
</script>
<style lang="scss" scoped>
.icon--status {
    width: 7.2rem;
    height: 7.2rem;
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 5rem;

    i {
        font-size: 2.4rem;
        color: var(--color-heading);
    }

    &.icon--red {
        background-color: alpha(var(--color-red), var(--level-1));

        i {
            color: var(--color-red);
        }
    }

    &.icon--warning {
        background-color: alpha(var(--color-blue), var(--level-1));

        i {
            color: var(--color-blue);
        }
    }

    &.icon--success {
        background-color: alpha(var(--color-primary), var(--level-1));

        i {
            color: var(--color-primary);
        }
    }
}
</style>
