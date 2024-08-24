<template>
    <div class="card" :class="rarity" @contextmenu.prevent="e=>menu.show(e)">
        <img :src="img" alt="" aria-haspopup="true" aria-controls="overlay_menu" >
        <span class="count">{{ props.count }}</span>
        <Menu ref="menu" :model="menuItems" :popup="true" id="overlay_menu" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    count: number,
    img: string,
    rarity: "normal" | "rare" | "epic" | "legendary"
}>()

const menu = ref<any|undefined>(undefined)
const menuItems = [
    { label: 'Use', icon: 'pi pi-fw pi-check' },
    { label: 'Sell', icon: 'pi pi-fw pi-dollar' },
    { label: 'Info', icon: 'pi pi-fw pi-info' },
    { label: 'Delete', icon: 'pi pi-fw pi-trash' }
]
</script>


<style lang="scss" scoped>
.card {
    width: 60px;
    height: 60px;
    border-radius: 15px;
    transition: box-shadow 150ms;
    display: inline-block;
    position: relative;
    cursor: grab;

    --shadow-col: oklch(75% 20% 60deg);
    &.rare { --shadow-col: oklch(75% 60% -90deg); }
    &.epic { --shadow-col: oklch(75% 60% 0deg); }
    &.legendary { --shadow-col: oklch(85% 90% 70deg); }
    box-shadow: inset 0 0 20px var(--shadow-col);

    &:hover {
        box-shadow: inset 0 0 0px 1px #fff, inset 0 0 30px 5px var(--shadow-col);
    }

    &>* {
        pointer-events: none;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        padding: 8%;
    }
}
.count {
    position: absolute;
    bottom: 0%;
    right: 0%;
    translate: 5% 5%;
    z-index: 1;
    font-size: 80%;
    color: white;
    background-color: #0009;
    padding: 0.1em 0.3em;
    border-radius: 0.4em;
}
</style>

