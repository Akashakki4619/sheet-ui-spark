import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface Tab {
  id: string;
  name: string;
  isActive: boolean;
}

interface SpreadsheetTabsProps {
  onTabChange: (tabId: string) => void;
  onTabAdd: () => void;
}

export const SpreadsheetTabs = ({ onTabChange, onTabAdd }: SpreadsheetTabsProps) => {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 'financial-overview', name: 'Q3 Financial Overview', isActive: false },
    { id: 'abc', name: 'ABC', isActive: false },
    { id: 'answer-question', name: 'Answer a question', isActive: false },
    { id: 'extract', name: 'Extract', isActive: false },
    { id: 'spreadsheet-3', name: 'Spreadsheet 3', isActive: true }
  ]);

  const handleTabClick = (tabId: string) => {
    setTabs(tabs.map(tab => ({ ...tab, isActive: tab.id === tabId })));
    onTabChange(tabId);
  };

  return (
    <div className="flex items-center bg-sheet-header border-b border-sheet-border px-4">
      <div className="flex items-center space-x-1 overflow-x-auto">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            size="sm"
            className={`
              px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors
              ${tab.isActive 
                ? 'bg-background border-primary text-foreground' 
                : 'border-transparent text-muted-foreground hover:bg-sheet-hover hover:text-foreground'
              }
            `}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.name}
          </Button>
        ))}
        
        <Button
          variant="ghost"
          size="sm"
          className="ml-2 h-8 w-8 p-0 text-muted-foreground hover:bg-sheet-hover"
          onClick={onTabAdd}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};