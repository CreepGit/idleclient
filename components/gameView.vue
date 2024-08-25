<template>
    <div class="gameContainer" @contextmenu.prevent>
        <img class="img" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fbeanselfie204.weebly.com%2Fuploads%2F1%2F2%2F4%2F8%2F124806428%2F892474356.jpg&f=1&nofb=1&ipt=bb738d03790200ca4e03e4526bc8af679feed76b3314b73454cd8372fcd691f7&ipo=images" alt="">
        <div class="topLeft">
            <div class="container">
                <span><i class="pi pi-dollar" style="margin-right: 1ch;"></i>40 021</span>
                <span><i class="pi pi-sparkles" style="margin-right: 1ch;"></i>1202 xp</span>
                <span><i class="pi pi-star" style="margin-right: 1ch;"></i>Lvl 10</span>
            </div>
            <div class="pins">
                <div class="pin" v-for="[i, art] in [['Gold', 'sprite/tile020.png'],['Clay', 'sprite/tile021.png'],['Bomb', 'sprite/tile001.png'],]">
                    <i class="pi pi-thumbtack"></i>
                    <span>{{ searchForPinItemCount(i) }} {{ i }}</span>
                    <img :src=art alt="">
                </div>
                <div class="pin">
                    <i class="pi pi-thumbtack" @click="clickPinSearch"></i>
                    <Transition name="widen">
                        <input ref="pinSearch" type="text" v-if="showPinSearch" />
                    </Transition>
                </div>
            </div>
        </div>
        <Transition name="slideup">
            <div class="inventoryPanel" v-if="isInventoryOpen">
                <div class="mainView">
                    <div style="display: flex; gap: 1rem;">
                        <h1>Stash</h1>
                        <Button @click="sortInventory" label="Sort" icon="pi pi-sync" class="button" />
                    </div>
                    <ItemGrid class="mainInventory" v-model="inventoryItems" :slots="100" />
                </div>
            </div>
        </Transition>
        <div class="bottom">
            <Button class="button" icon="pi pi-map" />
            <Button class="button" icon="pi pi-home" />
            <Button class="button" icon="pi pi-search" />
            <Button class="button" icon="pi pi-list" @click="isInventoryOpen=!isInventoryOpen" />
            <Button class="button" icon="pi pi-cog" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import type { InventoryItem } from '~/assets/types-temp';

const showPinSearch = ref(false)
const pinSearch = ref<HTMLInputElement|undefined>(undefined)
function clickPinSearch() {
    showPinSearch.value = !showPinSearch.value
    setTimeout(()=>{
        if (!showPinSearch.value) return
        pinSearch.value?.focus()
    }, 50)
}
const isInventoryOpen = ref(false)
const inventoryItems = ref<Record<number, InventoryItem>>({
    0: { count: 1415, src: "/sprite/tile021.png", rarity: "normal", name: "Clay" },
    3: { count: 40, src: "/sprite/tile020.png", rarity: "normal", name: "Gold" },
    5: { count: 3, src: "/sprite/tile001.png", rarity: "normal", name: "Bomb" },
    6: { count: 1, src: "/sprite/tile002.png", rarity: "rare", name: "Bucket" },
    7: { count: 1, src: "/sprite/tile003.png", rarity: "epic", name: "Rope" },
    8: { count: 1, src: "/sprite/tile004.png", rarity: "legendary", name: "Spyglass" },
    9: { count: 1, src: "/sprite/tile005.png", rarity: "normal", name: "Map" },
    10: { count: 1, src: "/sprite/tile006.png", rarity: "normal", name: "Pickaxe" },
    11: { count: 1, src: "/sprite/tile007.png", rarity: "normal", name: "Shovel" },
    12: { count: 1, src: "/sprite/tile008.png", rarity: "normal", name: "Hoe" },
    13: { count: 1, src: "/sprite/tile009.png", rarity: "normal", name: "Axe" },
    14: { count: 1, src: "/sprite/tile010.png", rarity: "normal", name: "Sword" },
    15: { count: 1, src: "/sprite/tile011.png", rarity: "normal", name: "Fishing Pole" },
    16: { count: 1, src: "/sprite/tile012.png", rarity: "normal", name: "Bow" },
    17: { count: 1, src: "/sprite/tile013.png", rarity: "normal", name: "Stick" },
    18: { count: 1, src: "/sprite/tile014.png", rarity: "normal", name: "Torch" },
    19: { count: 1, src: "/sprite/tile015.png", rarity: "normal", name: "Compass" },
    20: { count: 1, src: "/sprite/tile016.png", rarity: "normal", name: "Mana Potion" },
    21: { count: 1, src: "/sprite/tile017.png", rarity: "normal", name: "Life Potion" },
})
function sortInventory() {
    const itemsOfType: Record<string, InventoryItem> = {}
    Object.values(inventoryItems.value).forEach(item => {
        const name = item.name
        if (!itemsOfType[name]) itemsOfType[name] = item
        else {
            itemsOfType[name].count += item.count
        }
    })
    const newItems = Object.fromEntries(Object.values(itemsOfType).map((item, i) => [i, item]))
    inventoryItems.value = newItems
}
function searchForPinItemCount(itemType: string) {
    let count = 0
    Object.entries(inventoryItems.value).forEach(([slot, item]) => {
        if (item.name.toLowerCase().includes(itemType.toLowerCase())) count += item.count
    })
    return count
}
</script>

<style lang="scss" scoped>
.gameContainer {
    position: relative;
    min-height: 100svh;
    min-width: 100vw;
    overflow: hidden;
    user-select: none;
    -webkit-user-drag: none;
    --bg: oklch(80% 6% 55deg);
    --bg2: oklch(60% 6% 35deg);
}

.img {
    position: absolute;
    inset: 0;
    width: 100%;
    z-index: -1;
}

.topLeft {
    position: absolute;
    top: 0;
    left: 0;

    .container {
        display: inline-flex;
        flex-direction: column;
        border: 0px solid black;
        background-color: var(--bg);
        border-width: 0 2px 2px 0;
        border-radius: 0 0 10px 0;
        padding: 7px;
        min-width: 30px;
        min-height: 30px;
    }

    .pins {
        margin-top: 5px;
        display: flex;
        flex-direction: column;
        gap: 1px;

        .pin {
            display: flex;
            border: 2px solid black;
            background-color: var(--bg);
            gap: 3px;
            padding: 1px;
            padding-right: 4px;
            border-radius: 0 10px 10px 0;
            width: max-content;

            &:has(i:hover) {
                background-color: var(--bg2);
            }

            img {
                height: 20px;
            }

            input {
                width: 100px;
                background-color: oklch(60% 6% 35deg);
                border: none;
            }
        }
    }
}

.bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: max-content;
    display: flex;
    gap: 5px;
    padding: 5px 15px;
    background-color: var(--bg);
    border-radius: 10px 10px 0 0;
    border: 2px solid black;
    border-width: 2px 2px 0 2px;
}

.button {
    --p-button-primary-border-color: black;
    --p-button-primary-hover-border-color: black;
    --p-button-primary-color: black;
    --p-button-primary-background: var(--bg2);
    --p-button-primary-hover-background: var(--bg);
}

.inventoryPanel {
    position: absolute;
    inset: 50px;
    max-width: 1000px;
    margin: 0 auto;
    bottom: 0;
    padding: 20px;
    box-shadow: 0 0 20px 5px black;
    background: var(--bg);

    .mainView {
        position: absolute;
        display: flex;
        flex-direction: column;
        bottom: 15px;
        top: 15px;
        left: 15px;
        width: 66%;
    }

    .mainInventory {
        flex-grow: 1;
        flex-shrink: 1;
    }
}

.widen-enter-active, .widen-leave-active {
    transition: width 150ms !important;
}
.widen-enter-to, .widen-leave-from {
    width: 100px !important;
}
.widen-enter-from, .widen-leave-to {
    width: 0px !important;
}

.slideup-enter-active, .slideup-leave-active {
    transition: transform 150ms !important;
}
.slideup-enter-to, .slideup-leave-from {
    transform: translateY(0) !important;
}
.slideup-enter-from, .slideup-leave-to {
    transform: translateY(100%) !important;
}
</style>
