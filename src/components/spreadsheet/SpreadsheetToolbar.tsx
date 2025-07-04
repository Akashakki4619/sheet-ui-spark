import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Filter, 
  Import, 
  Share, 
  ArrowDown, 
  ArrowUp,
  ChevronDown,
  Plus,
  Columns3
} from 'lucide-react';

interface SpreadsheetToolbarProps {
  onAction: (action: string) => void;
}

export const SpreadsheetToolbar = ({ onAction }: SpreadsheetToolbarProps) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    onAction(`sort-${newDirection}`);
  };

  const toolbarButtons = [
    { 
      icon: sortDirection === 'asc' ? ArrowUp : ArrowDown, 
      label: 'Sort', 
      action: handleSort,
      variant: 'ghost' as const
    },
    { 
      icon: Filter, 
      label: 'Filter', 
      action: () => onAction('filter'),
      variant: 'ghost' as const
    },
    { 
      icon: Columns3, 
      label: 'Cell view', 
      action: () => onAction('cell-view'),
      variant: 'ghost' as const
    },
    { 
      icon: Import, 
      label: 'Import', 
      action: () => onAction('import'),
      variant: 'ghost' as const
    },
    { 
      icon: ArrowUp, 
      label: 'Export', 
      action: () => onAction('export'),
      variant: 'ghost' as const
    },
    { 
      icon: Share, 
      label: 'Share', 
      action: () => onAction('share'),
      variant: 'ghost' as const
    },
    { 
      icon: Plus, 
      label: 'New Action', 
      action: () => onAction('new-action'),
      variant: 'default' as const
    }
  ];

  return (
    <div className="flex items-center justify-between p-4 bg-toolbar-bg border-b border-toolbar-border">
      <div className="flex items-center space-x-2">
        <h1 className="text-lg font-semibold text-foreground">Spreadsheet 3</h1>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </div>
      
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          className="text-sm text-muted-foreground hover:bg-toolbar-hover"
          onClick={() => onAction('hide-fields')}
        >
          Hide Fields
        </Button>
        
        {toolbarButtons.map((button, index) => (
          <Button
            key={index}
            variant={button.variant}
            size="sm"
            className={`flex items-center space-x-2 ${
              button.variant === 'default' 
                ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                : 'hover:bg-toolbar-hover'
            }`}
            onClick={typeof button.action === 'function' ? button.action : () => onAction(button.label.toLowerCase())}
          >
            <button.icon className="h-4 w-4" />
            <span>{button.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};