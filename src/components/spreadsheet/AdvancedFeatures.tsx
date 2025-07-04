import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface ContextMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  onAction: (action: string) => void;
  cellData?: {
    row: number;
    col: string;
    value: string;
  };
}

export const CellContextMenu = ({ isOpen, position, onClose, onAction, cellData }: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const menuItems = [
    { label: 'Cut', action: 'cut', shortcut: 'Ctrl+X' },
    { label: 'Copy', action: 'copy', shortcut: 'Ctrl+C' },
    { label: 'Paste', action: 'paste', shortcut: 'Ctrl+V' },
    { label: '---', action: 'separator' },
    { label: 'Insert Row Above', action: 'insert-row-above' },
    { label: 'Insert Row Below', action: 'insert-row-below' },
    { label: 'Delete Row', action: 'delete-row' },
    { label: '---', action: 'separator' },
    { label: 'Format Cell', action: 'format-cell' },
    { label: 'Add Comment', action: 'add-comment' },
    { label: 'Clear Contents', action: 'clear-contents' }
  ];

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-background border border-border rounded-md shadow-lg py-1 min-w-[180px] animate-scale-in"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -10px)'
      }}
    >
      {menuItems.map((item, index) => {
        if (item.action === 'separator') {
          return <hr key={index} className="my-1 border-border" />;
        }
        
        return (
          <button
            key={index}
            className="w-full px-3 py-2 text-left text-sm hover:bg-sheet-hover flex items-center justify-between"
            onClick={() => {
              onAction(item.action);
              onClose();
            }}
          >
            <span>{item.label}</span>
            {item.shortcut && (
              <span className="text-xs text-muted-foreground font-mono">
                {item.shortcut}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

interface ColumnResizeHandleProps {
  columnIndex: number;
  onResize: (columnIndex: number, width: number) => void;
}

export const ColumnResizeHandle = ({ columnIndex, onResize }: ColumnResizeHandleProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    setStartX(e.clientX);
    
    // Get current column width
    const thElement = e.currentTarget.closest('th');
    if (thElement) {
      setStartWidth(thElement.offsetWidth);
    }
    
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const deltaX = e.clientX - startX;
      const newWidth = Math.max(60, startWidth + deltaX); // Minimum width of 60px
      onResize(columnIndex, newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, startX, startWidth, columnIndex, onResize]);

  return (
    <div
      className={`absolute right-0 top-0 w-1 h-full cursor-col-resize bg-transparent hover:bg-blue-500 ${
        isResizing ? 'bg-blue-500' : ''
      }`}
      onMouseDown={handleMouseDown}
    />
  );
};

interface AdvancedFilterProps {
  columns: Array<{ key: string; label: string }>;
  onFilter: (filters: Record<string, string>) => void;
  onClose: () => void;
}

export const AdvancedFilter = ({ columns, onFilter, onClose }: AdvancedFilterProps) => {
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (columnKey: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [columnKey]: value
    }));
  };

  const handleApplyFilters = () => {
    onFilter(filters);
    onClose();
  };

  const handleClearFilters = () => {
    setFilters({});
    onFilter({});
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-background border border-border rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto animate-scale-in">
        <h3 className="text-lg font-semibold mb-4">Advanced Filter</h3>
        
        <div className="space-y-4">
          {columns.filter(col => col.key !== 'id').map((column) => (
            <div key={column.key}>
              <label className="text-sm font-medium text-foreground mb-1 block">
                {column.label}
              </label>
              <Input
                placeholder={`Filter by ${column.label.toLowerCase()}...`}
                value={filters[column.key] || ''}
                onChange={(e) => handleFilterChange(column.key, e.target.value)}
                className="w-full"
              />
            </div>
          ))}
        </div>
        
        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleClearFilters}>
            Clear All
          </Button>
          <Button onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};