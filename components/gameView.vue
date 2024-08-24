<template>
    <div>
        <Card>
            <template #content>
                <h1>Game view</h1>
                <br>
                <Slider v-model="width" style="max-width: 500px;" />
                <br>
                <Button style="margin: 5px;" @click="shuffle" label="Shuffle" />
                <Button style="margin: 5px;" @click="sortCount" label="Sort Count" />
                <Button style="margin: 5px;" @click="sortName" label="Sort Name" />
                <br>
                <br>
                <div class="invGrid" :style="{width: width*5+'px'}">
                    <TransitionGroup name="list">
                        <template v-for="index in 28">
                            <InventoryItem @delete="deleteValue(index-1)" v-if="item=inventory[index-1]" :name="item.name" :key="item.icon" :img="'sprite/'+item.icon" :count="item.count" :rarity="item.rarity" />
                            <div v-else class="emptySlot" :key="index"></div>
                        </template>
                        <!-- <InventoryItem v-for="item, index in inventory" :key="item.icon" :img="'sprite/'+item.icon" :count="item.count" :rarity="item.rarity" /> -->
                    </TransitionGroup>
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

const inventory = ref<({name: string, icon: string, count: number, rarity: 'normal'|'rare'|'epic'|'legendary'}|null)[]>([
    { name: 'Pack', icon: "tile000.png", count: getCountExpotential(), rarity: "normal" },
    { name: 'Explosive', icon: "tile001.png", count: getCountExpotential(), rarity: "rare" },
    { name: 'Bucket', icon: "tile002.png", count: getCountExpotential(), rarity: "epic" },
    { name: 'Rope', icon: "tile003.png", count: getCountExpotential(), rarity: "legendary" },
    { name: 'Spyglass', icon: "tile004.png", count: getCountExpotential(), rarity: "normal" },
    { name: 'Map', icon: "tile005.png", count: getCountExpotential(), rarity: "rare" },
    { name: 'Pickaxe', icon: "tile006.png", count: getCountExpotential(), rarity: "epic" },
    { name: 'Shovel', icon: "tile007.png", count: getCountExpotential(), rarity: "legendary" },
    { name: 'Fork', icon: "tile008.png", count: getCountExpotential(), rarity: "normal" },
    { name: 'Axe', icon: "tile009.png", count: getCountExpotential(), rarity: "rare" },
    { name: 'Sword', icon: "tile010.png", count: getCountExpotential(), rarity: "epic" },
    { name: 'Fishing Rod', icon: "tile011.png", count: getCountExpotential(), rarity: "legendary" },
    { name: 'Bow', icon: "tile012.png", count: getCountExpotential(), rarity: "normal" },
    { name: 'Stick', icon: "tile013.png", count: getCountExpotential(), rarity: "rare" },
    { name: 'Torch', icon: "tile014.png", count: getCountExpotential(), rarity: "epic" },
    { name: 'Compass', icon: "tile015.png", count: getCountExpotential(), rarity: "legendary" },
    { name: 'Mana Potion', icon: "tile016.png", count: getCountExpotential(), rarity: "normal" },
    { name: 'Health Potion', icon: "tile017.png", count: getCountExpotential(), rarity: "rare" },
    { name: 'Crystal', icon: "tile018.png", count: getCountExpotential(), rarity: "epic" },
    { name: 'Gem', icon: "tile019.png", count: getCountExpotential(), rarity: "legendary" },
    { name: 'Gold', icon: "tile020.png", count: getCountExpotential(), rarity: "normal" },
    { name: 'Clay', icon: "tile021.png", count: getCountExpotential(), rarity: "rare" },
    { name: 'Stone', icon: "tile022.png", count: getCountExpotential(), rarity: "epic" },
    { name: 'Coal', icon: "tile023.png", count: getCountExpotential(), rarity: "legendary" },
])

const item: any = undefined
const width = ref(50)

function shuffle() {
    const toAdd = [...inventory.value]
    inventory.value = toAdd.sort(() => Math.random() - 0.5)
}

function sortCount() {
    const toAdd = [...inventory.value]
    inventory.value = toAdd.sort((a: any, b: any) => a.count - b.count)
}

function sortName() {
    const toAdd = [...inventory.value]
    inventory.value = toAdd.sort((a: any, b: any) => a.name.localeCompare(b.name))
}

function deleteValue(index: number) {
    const toAdd = [...inventory.value].filter((_, i) => i !== index)
    inventory.value = toAdd
}

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
    grid-template-columns: repeat(auto-fill, 50px);
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
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 200ms ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.emptySlot {
    width: 50px;
    height: 50px;
    border-radius: 15px;
    background-color: #0003;
    box-shadow: inset 0 0 20px oklch(35% 0% 60deg);
}
</style>