import { type ReactElement } from 'react';
type DropdownMenuTriggerElement = ReactElement<Record<string, unknown>>;
export interface DropdownMenuItem {
    disabled?: boolean;
    label: string;
    onSelect?: () => void;
    tone?: 'default' | 'danger';
}
export interface DropdownMenuProps {
    defaultOpen?: boolean;
    items: DropdownMenuItem[];
    onOpenChange?: (open: boolean) => void;
    open?: boolean;
    title?: string;
    trigger: DropdownMenuTriggerElement;
}
export declare function DropdownMenu({ defaultOpen, items, onOpenChange, open, title, trigger, }: DropdownMenuProps): import("react/jsx-runtime").JSX.Element | null;
export {};
