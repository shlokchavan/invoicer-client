import { EventEmitter } from '@angular/core';

export interface IChipConfig {
    // value: string | number;
    icon?: string;
    iconColor?: string;
    class?: string;
    colorCode?: string;
    colorClass?: string;
    isLargeChip: boolean;
    removable: boolean;
    draggable: boolean;
    clickable: boolean;
    isBadge: boolean
}

//Methods & EventEmitters
export interface IChipEvents {
    onClick: EventEmitter<any>;
    onRemove: EventEmitter<any>;
    onDrag: EventEmitter<any>;
    onDrop: EventEmitter<any>;
}