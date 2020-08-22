<template>
    <b-card
        ref="card"
        :img-src="result.Poster"
        :img-alt="result.Title"
        title-tag="h4"
        overlay
        body-class="d-flex align-items-end text-white"
        @click="$router.push('movie/' + result.imdbID)"
        @mousemove="mouseMove"
        @mouseleave="mouseLeave"
        @mouseover="mouseOver"
    >
        <span ref="refl" class="reflection" />
        <div class="body-container">
            <b-card-title>{{ result.Title }}</b-card-title>
            <b-card-sub-title>{{ result.Year }}</b-card-sub-title>
        </div>
    </b-card>
</template>

<script>
export default {
    name: 'CustomCard',
    props: {
        result: {
            type: Object,
            required: true
        }
    },

    methods: {
        // Card transition methods
        mouseOver () {
            const refl = this.$refs.refl
            refl.style.opacity = 1
        },
        mouseLeave () {
            const card = this.$refs.card
            const refl = this.$refs.refl
            card.style.transform = 'perspective(500px) scale(1)'
            refl.style.opacity = 0
        },

        mouseMove () {
            const card = this.$refs.card
            const refl = this.$refs.refl

            const relX = (event.offsetX + 1) / card.offsetWidth
            const relY = (event.offsetY + 1) / card.offsetHeight
            const rotY = `rotateY(${(relX - 0.5) * 20}deg)`
            const rotX = `rotateX(${(relY - 0.5) * -20}deg)`
            card.style.transform = `perspective(500px) scale(1.2) ${rotY} ${rotX}`

            const lightX = this.scale(relX, 0, 1, 150, -50)
            const lightY = this.scale(relY, 0, 1, 30, -100)
            const lightConstrain = Math.min(Math.max(relY, 0.3), 0.7)
            const lightOpacity = this.scale(lightConstrain, 0.3, 1, 1, 0) * 255
            const lightShade = `rgba(${lightOpacity}, ${lightOpacity}, ${lightOpacity}, 1)`
            const lightShadeBlack = 'rgba(0, 0, 0, 1)'
            refl.style.backgroundImage = `radial-gradient(circle at ${lightX}% ${lightY}%, ${lightShade} 20%, ${lightShadeBlack})`
        },
        scale: (val, inMin, inMax, outMin, outMax) => outMin + (val - inMin) * (outMax - outMin) / (inMax - inMin)
    }
}
</script>

<style lang="scss">
.body-container {
    background: linear-gradient(0deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    margin-bottom: 0;
    padding: 1rem;
    display: block;
    width: 100%;
    pointer-events: none;
}
</style>
