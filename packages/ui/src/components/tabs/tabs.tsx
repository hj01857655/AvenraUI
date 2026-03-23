import { useState, type ReactNode } from 'react';

export interface TabsItem {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  items: TabsItem[];
  defaultTabId?: string;
}

export function Tabs({ items, defaultTabId }: TabsProps) {
  const initialTabId = defaultTabId ?? items[0]?.id;
  const [activeTab, setActiveTab] = useState(initialTabId);
  const activeItem = items.find((item) => item.id === activeTab) ?? items[0];

  return (
    <div className="avenra-tabs">
      <div className="avenra-tabs__list" role="tablist" aria-label="Tabs">
        {items.map((item) => {
          const isActive = item.id === activeItem?.id;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive ? 'true' : 'false'}
              aria-controls={`panel-${item.id}`}
              id={`tab-${item.id}`}
              className={[
                'avenra-tabs__trigger',
                isActive && 'avenra-tabs__trigger--active',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {activeItem ? (
        <div
          role="tabpanel"
          id={`panel-${activeItem.id}`}
          aria-labelledby={`tab-${activeItem.id}`}
          className="avenra-tabs__panel"
        >
          {activeItem.content}
        </div>
      ) : null}
    </div>
  );
}
