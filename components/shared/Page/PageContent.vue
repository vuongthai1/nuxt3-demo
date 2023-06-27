<template lang="html">
    <div class="page__content">
        <MediaLibrary />
    </div>
</template>

<script>
import TypgraphyContent from "~/components/shared/Page/TypgraphyContent"
import MediaLibrary from "~/components/components/MediaLibrary/MediaLibrary"
export default {
    name: "PageContent",
    components: { TypgraphyContent, MediaLibrary }
}
</script>

<style lang="scss" scoped></style>
