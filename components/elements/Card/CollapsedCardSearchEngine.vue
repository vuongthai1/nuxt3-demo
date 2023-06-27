<template lang="html">
    <div class="card--collapsed">
        <div class="card__top">
            <p> {{ title }}</p>
            <div class="flex-grow-1 text-right d-flex justify-end align-center">
                <v-btn class="card__toggleBtn" icon @click="expand = !expand">
                    <i v-if="expand" class="ri-arrow-up-s-line" />
                    <i v-else class="ri-arrow-down-s-line" />
                </v-btn>
            </div>
        </div>
        <slide-up-down :active="expand" class="accordion" :duration="200">
            <div class="card__wrapper">
                <slot />
                <!-- <div class="search-engine">
                    <div class="search-engine__note">Setup meta title & description to make your site easy to discovered
                        on
                        search engines such as Google</div>
                    <div class="search-engine__SEO-title">
                        <div class="title-block">SEO Title</div>
                        <v-text-field v-model="seoTitle" placeholder="SEO title here" item-text="text"
                            item-value="value" outlined dense class>
                        </v-text-field>
                    </div>
                    <div class="search-engine__SEO-description">
                        <div class="title-block">SEO description</div>
                        <v-textarea v-model="seoDescription" outlined dense></v-textarea>
                    </div>
                </div> -->
            </div>
        </slide-up-down>
    </div>
</template>

<script>
export default {
    name: "CollapsedCardSearchEngine",
    props: {
        title: {
            type: String,
            default: () => "Search Engine Optimize"
        }
    },
    data() {
        return {
            expand: true
        }
    }
}
</script>

<style lang="scss" scoped>
.card--collapsed {
    margin: 1.2rem 0;
    background-color: var(--color-bg-gray);
    border-radius: 1.6rem;
    border: 0.1rem solid hsla(var(--color-gray-h), var(--color-gray-s), var(--color-gray-l), var(--level-1));

    .card__toggleBtn {
        width: 3rem;
        height: 3rem;
        margin-left: 1.2rem;

        i {
            font-size: 1.6rem !important;
            color: var(--color-heading);
        }
    }

    .card__top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // gap: 1.6rem;

        min-height: 4rem;
        padding: 1.7rem 3.2rem;

        p {
            margin: 0;
            font-size: 1.6rem;
            font-weight: 600;
            color: var(--color-heading);
        }
    }
}

.search-engine {
    padding: 2rem 3.2rem;
    background-color: var(--color-white);

    &__note {
        font-weight: 500;
        color: var(--color-black);
        margin-bottom: 2.8rem;
    }

    &__SEO-title {
        // margin-bottom: 2.8rem;
        width: 50%;
    }
}
</style>
