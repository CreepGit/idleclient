<template>
    <div class="itemGrid">
        <div v-for="{slot, item} in slots" class="itemSlot" @contextmenu="openContextMenu(slot)" @mousedown="e=>selectItem(e,slot)" @mouseenter=hoverOver(slot) @mouseleave=unHover(slot)>
            <div class="slotVisual">
                <div class="item" v-if="item" :class="{moving: mouseItemSlot == slot}" >
                    <img draggable="false" :src="item.src" alt="">
                    <span class="count">{{ displayCount(item.count) }}</span>
                </div>
            </div>
        </div>
        <div v-if="mouseItemSlot>=0" class="mouseItem" :style="{left: mouseX + 'px', top: mouseY + 'px'}">
            <div class="item">
                <img draggable="false" :src="items[mouseItemSlot].src" alt="">
                <span class="count">{{ displayCount(items[mouseItemSlot].count) }}</span>
            </div>
        </div>
        <div v-else-if="contextMenu" :style="{left: contextMenu.x + 'px', top: contextMenu.y + 'px'}" ref="contextMenuElement" class="contextMenu" @click="contextMenu=undefined">
            <button @click="menuDublicate">Dublicate</button>
            <br>
            <button @click="menuSplit">Split</button>
            <br>
            <button @click="menuDelete">Delete</button>
        </div>
        <div v-else-if="items[currentlyHoveringOver]" class="tooltip" :style="{left: mouseX + 'px', top: mouseY + 'px'}">
            <span>{{ items[currentlyHoveringOver].name }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { InventoryItem } from '~/assets/types-temp';
const props = defineProps({
    slots: {
        type: Number,
        required: true,
    },
})
const items: Ref<Record<number, InventoryItem>> = defineModel() as any
function displayCount(count: number) {
    if (count > 1000000000000) return Math.floor(count / 1000000000000) + "T"
    if (count > 1000000000) return Math.floor(count / 1000000000) + "B"
    if (count > 10000000) return Math.floor(count / 1000000) + "M"
    if (count > 10000) return Math.floor(count / 1000) + "K"
    return count.toString()
}
const slots = computed(()=>{
    const arr = []
    for (let i = 0; i < props.slots; i++) {
        arr.push({ slot: i, item: items.value[i] as InventoryItem|undefined })
    }
    return arr
})
const {x: mouseX, y: mouseY} = useMouse()
const {pressed: mousePressed} = useMousePressed()
const mouseItemSlot = ref<number>(-1)
function selectItem(event: MouseEvent, slot: number) {
    mouseItemSlot.value = -1
    if (event.button != 0) return;
    const item = items.value[slot]
    if (item == undefined) return; 
    mouseItemSlot.value = slot
}

const currentlyHoveringOver = ref(-1)
function hoverOver(slot: number) {
    currentlyHoveringOver.value = slot
}
function unHover(slot: number) {
    if (currentlyHoveringOver.value === slot) {
        currentlyHoveringOver.value = -1
    }
}

watch(mousePressed, (pressed)=>{
    if (contextMenu.value) {
        if (distanceFromContextMenu.value > 0) {
            contextMenu.value = undefined
        }
    }
    if (!pressed) {
        if (mouseItemSlot.value >= 0) {
            if (currentlyHoveringOver.value >= 0) {
                if (mouseItemSlot.value == currentlyHoveringOver.value) {
                    mouseItemSlot.value = -1
                    return;
                };
                const oldItem = items.value[currentlyHoveringOver.value]
                const newItem = items.value[mouseItemSlot.value]
                const isSameItem = oldItem?.name == newItem?.name
                if (isSameItem && oldItem && newItem) {
                    // Same item
                    oldItem.count += newItem.count
                    delete items.value[mouseItemSlot.value]
                    mouseItemSlot.value = -1
                    return;
                } else {
                    // Different item
                    items.value[currentlyHoveringOver.value] = items.value[mouseItemSlot.value]
                    if (oldItem) {
                        items.value[mouseItemSlot.value] = oldItem
                    } else {
                        delete items.value[mouseItemSlot.value]
                    }
                }
            }
            mouseItemSlot.value = -1
        }
    }
})

const contextMenuElement = ref<HTMLElement|undefined>(undefined)
const contextMenu = ref<undefined|{x: number, y: number, slot: number}>(undefined)
const distanceFromContextMenu = computed(()=>{
    if (contextMenu.value == undefined) return 0

    const width = contextMenuElement.value?.clientWidth ?? 0
    const height = contextMenuElement.value?.clientHeight ?? 0

    let yDiff =  contextMenu.value!.y - mouseY.value
    if (yDiff < 0) yDiff = mouseY.value - height - contextMenu.value!.y
    if (yDiff < 0) yDiff = 0

    let xDiff =  contextMenu.value!.x - mouseX.value
    if (xDiff < 0) xDiff = mouseX.value - width - contextMenu.value!.x
    if (xDiff < 0) xDiff = 0

    const dist = Math.floor(Math.sqrt(xDiff * xDiff + yDiff * yDiff))
    return dist
})
watch(distanceFromContextMenu, (dist) => {
    if (contextMenu.value) {
        if (dist > 40) {
            contextMenu.value = undefined
        }
    }
})
function openContextMenu(slot: number) {
    if (items.value[slot] == undefined) return;
    contextMenu.value = {x: mouseX.value + 1, y: mouseY.value + 1, slot}
}
function menuDublicate() {
    const item = items.value[contextMenu.value!.slot]
    if (item == undefined) return;
    item.count += item.count
}

function menuDelete() {
    delete items.value[contextMenu.value!.slot]
}

function menuSplit() {
    const item = items.value[contextMenu.value!.slot]
    if (item == undefined) return;
    if (item.count <= 1) return;
    const nextSlot = findNextFreeSlot(contextMenu.value!.slot)
    if (nextSlot == -1) return;
    const newStackCount = Math.floor(item.count / 2)
    const oldStackCount = item.count - newStackCount
    const newItem = {...item, count: newStackCount}
    items.value[nextSlot] = newItem
    item.count = oldStackCount
}

function findNextFreeSlot(startingSlot: number = 0) {
    for (let i = startingSlot; i < props.slots; i++) {
        if (items.value[i] == undefined) return i
    }
    return -1
}
</script>

<style lang="scss" scoped>
.itemGrid {
    --slot-col: oklch(35% 9% 40deg / 30%);
    display: grid;
    grid-template-columns: repeat(auto-fill, 50px);
    overflow-y: scroll;
    align-content: start;
}

.itemSlot {
    width: 50px;
    height: 50px;
    position: relative;
    padding: 2px;

    &:hover {
        --slot-col: oklch(35% 9% 40deg / 40%);
    }
}

.item {
    position: relative;
    width: 100%;
    height: 100%;

    img {
        --inset: 4px;
        position: absolute;
        width: calc(100% - 2 * var(--inset));
        inset: var(--inset);
    }

    .count {
        position: absolute;
        bottom: 0;
        right: 0;
        color: white;
        filter: drop-shadow(0 0 2px black);
        letter-spacing: -1px;
    }

    &.moving {
        opacity: 30%;
    }
}

.tooltip {
    position: fixed;
    translate: 0 100%;
    background-color: #0009;
    color: white;
    z-index: 100;
    pointer-events: none;
    width: max-content;
    font-size: larger
}

.contextMenu {
    position: fixed;
    background-color: #0009;
    color: white;
    z-index: 100;
    width: max-content;
    display: flex;
    flex-direction: column;

    &>* {
        border: none;
        padding: 5px;
    }
}

.slotVisual {
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 20px 3px var(--slot-col), 0 0 2px 0px #0009;
}

.mouseItem {
    position: fixed;
    pointer-events: none;
    z-index: 100;
    width: 50px;
    height: 50px;
}
</style>
