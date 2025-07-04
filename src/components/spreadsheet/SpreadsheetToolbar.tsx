import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { DataExporter } from './DataExporter';
import { UndoRedoManager } from './UndoRedoManager';
import { useCollaboration } from './CollaborationFeatures';

interface SpreadsheetToolbarProps {
  onAction: (action: string) => void;
  data?: any[];
  selectedRows?: number[];
  onUndo?: () => void;
  onRedo?: () => void;
}

export const SpreadsheetToolbar = ({ 
  onAction, 
  data = [], 
  selectedRows = [], 
  onUndo = () => {}, 
  onRedo = () => {} 
}: SpreadsheetToolbarProps) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const { ActiveUsersList } = useCollaboration();
  
  const undoRedoManager = UndoRedoManager({
    onUndo: () => onUndo(),
    onRedo: () => onRedo()
  });

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
    <div className="space-y-2">
      {/* Main Toolbar */}
      <div className="flex items-center justify-between p-4 bg-toolbar-bg border-b border-toolbar-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-semibold text-foreground">Spreadsheet 3</h1>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
          
          {/* Collaboration Features */}
          <ActiveUsersList />
        </div>
        
        <div className="flex items-center space-x-1">
          {/* Undo/Redo Controls */}
          <undoRedoManager.UndoRedoControls />
          
          <div className="h-6 w-px bg-border mx-2" />
          
          <Button
            variant="ghost"
            size="sm"
            className="text-sm text-muted-foreground hover:bg-toolbar-hover"
            onClick={() => onAction('hide-fields')}
          >
            Hide Fields
          </Button>
          
          {toolbarButtons.slice(0, -2).map((button, index) => (
            <Button
              key={index}
              variant={button.variant}
              size="sm"
              className="flex items-center space-x-2 hover:bg-toolbar-hover"
              onClick={typeof button.action === 'function' ? button.action : () => onAction(button.label.toLowerCase())}
            >
              <button.icon className="h-4 w-4" />
              <span>{button.label}</span>
            </Button>
          ))}
          
          {/* Advanced Export */}
          <DataExporter 
            data={data} 
            selectedRows={selectedRows}
            filename="spreadsheet-data"
          />
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 hover:bg-toolbar-hover"
            onClick={() => onAction('share')}
          >
            <Share className="h-4 w-4" />
            <span>Share</span>
          </Button>
          
          <Button
            variant="default"
            size="sm"
            className="flex items-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => onAction('new-action')}
          >
            <Plus className="h-4 w-4" />
            <span>New Action</span>
          </Button>
        </div>
      </div>
    </div>
  );
};