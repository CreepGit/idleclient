<template>
    <div>
        <Card>
            <template #content>
                <h1>Game view</h1>
                <br>
                <Slider v-model="width" style="max-width: 500px;" />
                <br>
                <div class="invGrid" :style="{width: width*5+'px'}">
                    <InventoryItem v-for="_ in getItemCount()" :img="getRandomSprite()" :count="getCountExpotential()" :rarity="getRarity()" />
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
const sprites = [
    "/sprite/tile000.png",
    "/sprite/tile001.png",
    "/sprite/tile002.png",
    "/sprite/tile003.png",
    "/sprite/tile004.png",
    "/sprite/tile005.png",
    "/sprite/tile006.png",
    "/sprite/tile007.png",
    "/sprite/tile008.png",
    "/sprite/tile009.png",
    "/sprite/tile010.png",
    "/sprite/tile011.png",
    "/sprite/tile012.png",
    "/sprite/tile013.png",
    "/sprite/tile014.png",
    "/sprite/tile015.png",
    "/sprite/tile016.png",
    "/sprite/tile017.png",
    "/sprite/tile018.png",
    "/sprite/tile019.png",
    "/sprite/tile020.png",
    "/sprite/tile021.png",
    "/sprite/tile022.png",
    "/sprite/tile023.png",
]

const width = ref(50)

function getRandomSprite() {
    const randomIndex = Math.floor(Math.random() * sprites.length)
    return sprites[randomIndex]
}

function getCountExpotential() {
    const random = Math.random() * 33
    return Math.floor(random * random * random)+1
}

function getItemCount() {
    return Math.floor(Math.random() * 20) + 7
}

function getRarity() {
    const random = Math.random() * 100
    if (random < 1) return "legendary"
    if (random < 5+1) return "epic"
    if (random < 34+3+1) return "rare"
    return "normal"
}
</script>

<style lang="scss" scoped>
.invGrid {
    position: relative;
    display: grid;
    max-width: 690px;
    // border: 1px solid black;
    grid-template-columns: repeat(auto-fill, 60px);
    user-select: none;
    justify-content: center;
    gap: 5px;
    
    .widget {
        position: absolute;
        right: -15px;
        width: 20px;
        height: 20px;
        background-color: black;
        top: calc(50% - 10px);
    }
}
</style>