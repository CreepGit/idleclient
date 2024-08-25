<template>
    <div class="itemGrid">
        <div v-for="itemSlotN in props.slots" class="itemSlot">
            <div :setvalue="index = itemSlotN-1" class="slotVisual">
                <div v-if="item = props.items[index]">
                    <img draggable="false" :src="item.src" alt="">
                    <span class="count">{{ item.count }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { InventoryItem } from '~/assets/types-temp';

const props = defineProps({
    slots: Number,
    items: {} as any // as Record<number, InventoryItem>,
})
const model = defineModel()
const index = ref(0) // template binds this
const item = ref<InventoryItem|undefined>(undefined) // template binds this
console.log(props.items)
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
    }
}

.slotVisual {
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 20px 3px var(--slot-col), 0 0 2px 0px #0009;
}
</style>
