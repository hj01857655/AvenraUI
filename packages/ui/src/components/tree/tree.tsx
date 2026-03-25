import { cn } from '@avenra/utils';
import { useMemo, useState, type KeyboardEvent, type ReactNode } from 'react';

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  disabled?: boolean;
  icon?: ReactNode;
}

export interface TreeProps {
  nodes: TreeNode[];
  ariaLabel?: string;
  className?: string;
  selectedId?: string | null;
  defaultSelectedId?: string | null;
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  onSelectedIdChange?: (id: string | null) => void;
  onExpandedIdsChange?: (ids: string[]) => void;
}

function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = (nextValue: T | ((previousValue: T) => T)) => {
    const resolvedValue =
      typeof nextValue === 'function' ? (nextValue as (previousValue: T) => T)(currentValue) : nextValue;

    if (!isControlled) {
      setInternalValue(resolvedValue);
    }

    onChange?.(resolvedValue);
  };

  return [currentValue, setValue] as const;
}

function getBranchLabel(node: TreeNode) {
  return node.label.trim() || 'node';
}

export function Tree({
  ariaLabel = 'Tree',
  className,
  defaultExpandedIds = [],
  defaultSelectedId = null,
  expandedIds: expandedIdsProp,
  nodes,
  onExpandedIdsChange,
  onSelectedIdChange,
  selectedId: selectedIdProp,
}: TreeProps) {
  const [selectedId, setSelectedId] = useControllableState<string | null>({
    value: selectedIdProp,
    defaultValue: defaultSelectedId,
    onChange: onSelectedIdChange,
  });
  const [expandedIds, setExpandedIds] = useControllableState<string[]>({
    value: expandedIdsProp,
    defaultValue: defaultExpandedIds,
    onChange: onExpandedIdsChange,
  });
  const expandedIdSet = useMemo(() => new Set(expandedIds), [expandedIds]);

  const toggleExpanded = (nodeId: string) => {
    setExpandedIds((currentIds) => {
      const nextIds = new Set(currentIds);

      if (nextIds.has(nodeId)) {
        nextIds.delete(nodeId);
      } else {
        nextIds.add(nodeId);
      }

      return Array.from(nextIds);
    });
  };

  const renderNodes = (treeNodes: TreeNode[], level: number) => (
    <ul className={level === 1 ? cn('avenra-tree', className) : 'avenra-tree__group'} role={level === 1 ? 'tree' : 'group'} aria-label={level === 1 ? ariaLabel : undefined}>
      {treeNodes.map((node, index) => {
        const hasChildren = (node.children?.length ?? 0) > 0;
        const isExpanded = hasChildren && expandedIdSet.has(node.id);
        const isSelected = selectedId === node.id;

        const handleSelect = () => {
          if (node.disabled) {
            return;
          }

          setSelectedId(node.id);
        };

        const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
          if (!hasChildren || node.disabled) {
            return;
          }

          if (event.key === 'ArrowRight' && !isExpanded) {
            event.preventDefault();
            toggleExpanded(node.id);
          }

          if (event.key === 'ArrowLeft' && isExpanded) {
            event.preventDefault();
            toggleExpanded(node.id);
          }
        };

        return (
          <li className="avenra-tree__node" key={node.id} role="none">
            <div
              aria-disabled={node.disabled || undefined}
              aria-expanded={hasChildren ? isExpanded : undefined}
              aria-level={level}
              aria-posinset={index + 1}
              aria-selected={isSelected}
              aria-setsize={treeNodes.length}
              className={cn(
                'avenra-tree__item',
                hasChildren && 'avenra-tree__item--branch',
                isExpanded && 'avenra-tree__item--expanded',
                isSelected && 'avenra-tree__item--selected',
                node.disabled && 'avenra-tree__item--disabled',
              )}
              role="treeitem"
            >
              <div className="avenra-tree__row" style={{ paddingInlineStart: `${(level - 1) * 1.125}rem` }}>
                {hasChildren ? (
                  <button
                    aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${getBranchLabel(node)}`}
                    className="avenra-tree__toggle"
                    disabled={node.disabled}
                    onClick={() => toggleExpanded(node.id)}
                    type="button"
                  >
                    {isExpanded ? '−' : '+'}
                  </button>
                ) : (
                  <span aria-hidden="true" className="avenra-tree__spacer" />
                )}
                <button
                  className="avenra-tree__label"
                  disabled={node.disabled}
                  onClick={handleSelect}
                  onKeyDown={handleKeyDown}
                  type="button"
                >
                  {node.icon ? <span className="avenra-tree__icon">{node.icon}</span> : null}
                  <span>{node.label}</span>
                </button>
              </div>
            </div>
            {hasChildren && isExpanded ? renderNodes(node.children ?? [], level + 1) : null}
          </li>
        );
      })}
    </ul>
  );

  return renderNodes(nodes, 1);
}
