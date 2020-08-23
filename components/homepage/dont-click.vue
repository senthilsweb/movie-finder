<template>
    <div>
        <b-modal
            v-model="dontClick"
            centered
            button-size="sm d-none"
            header-bg-variant=" bg-gradient-primary text-white"
            body-bg-variant=" bg-gradient-primary"
            footer-class="d-none"
            title="Told you"
        >
            <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&autoplay=1"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            />
        </b-modal>

        <a href="#" class="dontClick" @click.prevent="dontClick=true">Don't Click</a>
    </div>
</template>

<script>
export default {
    name: 'DontClick',
    data () {
        return {
            dontClick: false
        }
    }
}
</script>

<style scoped>
.dontClick {
    position:absolute;
    right: 20px;
    bottom: 20px;
    opacity: .5;
    font-size: .8em;
}
</style>
