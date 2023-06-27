<template lang="html">
    <div>
        <div class="widget widget--information">
            <div class="widget--information__title">Information</div>
            <div class="widget--information__content">
                <span class="widget--information__content-left">Create</span>
                <span class="widget--information__content-right">{{ dateCreatedFormat }}</span>
            </div>
            <div class="widget--information__content">
                <span class="widget--information__content-left">By</span>
                <span class="widget--information__content-right">{{ createBy }}</span>
            </div>
            <div class="widget--information__content">
                <span class="widget--information__content-left">Last Updated</span>
                <span class="widget--information__content-right">{{ dateLastUpdateFormat }}</span>
            </div>
            <div class="widget--information__content">
                <span class="widget--information__content-left">By</span>
                <span class="widget--information__content-right">{{ updateBy }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "InformationWidget",
    props: {
        dateCreate: {
            type: String,
            default: () => "DD/MM/YYYY"
        },
        createBy: {
            type: String,
            default: () => "n/a"
        },
        lastUpdate: {
            type: String,
            default: () => "DD/MM/YYYY"
        },
        updateBy: {
            type: String,
            default: () => "n/a"
        }
    },
    computed: {
        dateCreatedFormat() {
            return this.$dayjs(this.dateCreate).format("DD/MM/YYYY - hh:mm a")
        },
        dateLastUpdateFormat() {
            return this.$dayjs(this.lastUpdate).format("DD/MM/YYYY - hh:mm a")
        },
    },
}
</script>
<style lang="scss" scoped>
.widget--information {
    padding: 1.8rem 2.4rem;
    border-radius: 0.8rem;
    margin-bottom: 1rem;
    border: 1px solid alpha(var(--color-gray), var(--level-2));
    background-color: var(--color-bg-gray);

    &__title {
        font-weight: 600;
        font-size: 1.8rem;
        color: var(--color-black);
        position: relative;
        padding-bottom: 0.4rem;

        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 0.2rem;
            background: alpha(var(--color-gray), var(--level-1));
        }
    }

    &__content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 1rem 0;

        &-left {
            font-weight: 400;
            font-size: 12px;
            color: var(--color-heading);
        }

        &-right {
            font-weight: 600;
            font-size: 12px;
            color: var(--color-heading);
        }
    }
}
</style>