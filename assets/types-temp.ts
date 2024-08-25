export type Rarirty = "normal" | "rare" | "epic" | "legendary";

export type InventoryItem = {
    name: string;
    src: string;
    count: number;
    rarity: Rarirty;
}
