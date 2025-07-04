import { useState, useEffect } from 'react';
import { StatusBadge } from './StatusBadge';
import { PriorityIndicator } from './PriorityIndicator';

export interface TableRow {
  id: number;
  jobRequest: string;
  submitted: string;
  status: 'In-process' | 'Need to start' | 'Complete' | 'Blocked';
  submitter: string;
  url: string;
  assigned: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  estValue: string;
}

interface SpreadsheetTableProps {
  data: TableRow[];
  onCellClick: (rowId: number, columnKey: string) => void;
  onCellDoubleClick: (rowId: number, columnKey: string) => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
}

export const SpreadsheetTable = ({ 
  data, 
  onCellClick, 
  onCellDoubleClick,
  sortColumn,
  sortDirection 
}: SpreadsheetTableProps) => {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: string } | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const columns = [
    { key: 'id', label: '#', width: 'w-12' },
    { key: 'jobRequest', label: 'Job Request', width: 'w-80' },
    { key: 'submitted', label: 'Submitted', width: 'w-32' },
    { key: 'status', label: 'Status', width: 'w-32' },
    { key: 'submitter', label: 'Submitter', width: 'w-40' },
    { key: 'url', label: 'URL', width: 'w-48' },
    { key: 'assigned', label: 'Assigned', width: 'w-40' },
    { key: 'priority', label: 'Priority', width: 'w-28' },
    { key: 'dueDate', label: 'Due Date', width: 'w-32' },
    { key: 'estValue', label: 'Est. Value', width: 'w-32' }
  ];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell) return;

      const currentRowIndex = data.findIndex(row => row.id === selectedCell.row);
      const currentColIndex = columns.findIndex(col => col.key === selectedCell.col);

      let newRowIndex = currentRowIndex;
      let newColIndex = currentColIndex;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          newRowIndex = Math.max(0, currentRowIndex - 1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          newRowIndex = Math.min(data.length - 1, currentRowIndex + 1);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          newColIndex = Math.max(0, currentColIndex - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          newColIndex = Math.min(columns.length - 1, currentColIndex + 1);
          break;
        case 'Enter':
          e.preventDefault();
          onCellDoubleClick(selectedCell.row, selectedCell.col);
          break;
      }

      if (newRowIndex !== currentRowIndex || newColIndex !== currentColIndex) {
        const newRow = data[newRowIndex];
        const newCol = columns[newColIndex];
        setSelectedCell({ row: newRow.id, col: newCol.key });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, data, columns, onCellDoubleClick]);

  const handleCellClick = (rowId: number, columnKey: string) => {
    setSelectedCell({ row: rowId, col: columnKey });
    onCellClick(rowId, columnKey);
  };

  const renderCellContent = (row: TableRow, columnKey: string) => {
    const value = row[columnKey as keyof TableRow];
    
    switch (columnKey) {
      case 'status':
        return <StatusBadge status={value as any} />;
      case 'priority':
        return <PriorityIndicator priority={value as any} />;
      case 'url':
        return (
          <a 
            href={`https://${value}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline truncate block"
            onClick={(e) => e.stopPropagation()}
          >
            {value}
          </a>
        );
      case 'estValue':
        return <span className="font-mono">{value}</span>;
      default:
        return <span className="truncate block">{value}</span>;
    }
  };

  const getCellClasses = (rowId: number, columnKey: string) => {
    const isSelected = selectedCell?.row === rowId && selectedCell?.col === columnKey;
    const isRowHovered = hoveredRow === rowId;
    
    return `
      px-3 py-2 text-sm border-r border-sheet-border cursor-cell
      ${isSelected ? 'bg-sheet-selected ring-2 ring-blue-500 ring-inset' : ''}
      ${isRowHovered && !isSelected ? 'bg-sheet-hover' : ''}
      ${columnKey === 'id' ? 'text-center font-mono text-muted-foreground' : ''}
    `.trim();
  };

  return (
    <div className="overflow-auto bg-background" style={{ height: 'calc(100vh - 120px)' }}>
      <table className="w-full border-collapse">
        <thead className="sticky top-0 z-10">
          <tr className="bg-sheet-header border-b border-sheet-border">
            {columns.map((column) => (
              <th 
                key={column.key}
                className={`
                  px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider
                  border-r border-sheet-border ${column.width} min-w-0
                  ${sortColumn === column.key ? 'bg-sheet-selected' : ''}
                `}
              >
                <div className="flex items-center space-x-1">
                  <span className="truncate">{column.label}</span>
                  {sortColumn === column.key && (
                    <span className="text-xs">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={row.id}
              className={`
                border-b border-sheet-border hover:bg-sheet-hover
                ${rowIndex % 2 === 0 ? 'bg-background' : 'bg-sheet-header/30'}
              `}
              onMouseEnter={() => setHoveredRow(row.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {columns.map((column) => (
                <td
                  key={`${row.id}-${column.key}`}
                  className={getCellClasses(row.id, column.key)}
                  onClick={() => handleCellClick(row.id, column.key)}
                  onDoubleClick={() => onCellDoubleClick(row.id, column.key)}
                >
                  {renderCellContent(row, column.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};