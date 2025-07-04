import { useState } from 'react';
import { SpreadsheetToolbar } from './SpreadsheetToolbar';
import { SpreadsheetTable, TableRow } from './SpreadsheetTable';
import { SpreadsheetTabs } from './SpreadsheetTabs';
import { FormulaBar } from './FormulaBar';
import { AdvancedFilter } from './AdvancedFeatures';
import { useToast } from '@/hooks/use-toast';

// Mock data matching the uploaded image
const mockData: TableRow[] = [
  {
    id: 1,
    jobRequest: 'Launch social media campaign for pro...',
    submitted: '15-11-2024',
    status: 'In-process',
    submitter: 'Aisha Patel',
    url: 'www.aishapatel...',
    assigned: 'Sophie Choudhury',
    priority: 'Medium',
    dueDate: '20-11-2024',
    estValue: '6,200,000'
  },
  {
    id: 2,
    jobRequest: 'Update press kit for company redesign',
    submitted: '28-10-2024',
    status: 'Need to start',
    submitter: 'Irfan Khan',
    url: 'www.irfankhanp...',
    assigned: 'Tejas Pandey',
    priority: 'High',
    dueDate: '30-10-2024',
    estValue: '3,500,000'
  },
  {
    id: 3,
    jobRequest: 'Finalize user testing feedback for app...',
    submitted: '05-12-2024',
    status: 'In-process',
    submitter: 'Mark Johnson',
    url: 'www.markjohns...',
    assigned: 'Rachel Lee',
    priority: 'Medium',
    dueDate: '10-12-2024',
    estValue: '4,750,000'
  },
  {
    id: 4,
    jobRequest: 'Design new features for the website',
    submitted: '10-01-2025',
    status: 'Complete',
    submitter: 'Emily Green',
    url: 'www.emilygreen...',
    assigned: 'Tom Wright',
    priority: 'Low',
    dueDate: '15-01-2025',
    estValue: '5,900,000'
  },
  {
    id: 5,
    jobRequest: 'Prepare financial report for Q4',
    submitted: '25-01-2025',
    status: 'Blocked',
    submitter: 'Jessica Brown',
    url: 'www.jessicabro...',
    assigned: 'Kevin Smith',
    priority: 'Low',
    dueDate: '30-01-2025',
    estValue: '2,800,000'
  }
];

export const Spreadsheet = () => {
  const [data, setData] = useState<TableRow[]>(mockData);
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: string } | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const { toast } = useToast();

  const handleToolbarAction = (action: string) => {
    console.log(`Toolbar action: ${action}`);
    
    // Handle sort actions
    if (action.startsWith('sort-')) {
      const direction = action.split('-')[1] as 'asc' | 'desc';
      setSortDirection(direction);
      
      if (sortColumn) {
        const sortedData = [...data].sort((a, b) => {
          const aValue = a[sortColumn as keyof TableRow];
          const bValue = b[sortColumn as keyof TableRow];
          
          if (direction === 'asc') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });
        setData(sortedData);
      }
      
      toast({
        title: "Sort Applied",
        description: `Sorted in ${direction}ending order`,
      });
      return;
    }

    // Handle other actions with toast notifications
    const actionMessages: { [key: string]: string } = {
      'hide-fields': 'Field visibility toggled',
      'filter': 'Advanced filter opened',
      'cell-view': 'Cell view mode toggled',
      'import': 'Import dialog opened',
      'export': 'Export options displayed',
      'share': 'Share dialog opened',
      'new-action': 'New action dialog opened'
    };

    if (action === 'filter') {
      setShowFilter(true);
      return;
    }

    toast({
      title: "Action Triggered",
      description: actionMessages[action] || `Action: ${action}`,
    });
  };

  const handleCellClick = (rowId: number, columnKey: string) => {
    console.log(`Cell clicked: Row ${rowId}, Column ${columnKey}`);
    setSortColumn(columnKey);
  };

  const handleCellDoubleClick = (rowId: number, columnKey: string) => {
    console.log(`Cell double-clicked: Row ${rowId}, Column ${columnKey}`);
    
    toast({
      title: "Cell Editing",
      description: `Started editing Row ${rowId}, Column ${columnKey}`,
    });
  };

  const handleCellEdit = (rowId: number, columnKey: string, newValue: string) => {
    console.log(`Cell edited: Row ${rowId}, Column ${columnKey}, New Value: ${newValue}`);
    
    setData(prev => prev.map(row => 
      row.id === rowId 
        ? { ...row, [columnKey]: newValue }
        : row
    ));
    
    toast({
      title: "Cell Updated",
      description: `Updated ${columnKey} for row ${rowId}`,
    });
  };

  const handleFormulaSubmit = (formula: string) => {
    console.log(`Formula submitted: ${formula}`);
    // Simulate formula calculation
    toast({
      title: "Formula Calculated",
      description: `Formula ${formula} has been processed`,
    });
  };

  const handleTabChange = (tabId: string) => {
    console.log(`Tab changed to: ${tabId}`);
    toast({
      title: "Tab Changed",
      description: `Switched to ${tabId}`,
    });
  };

  const handleTabAdd = () => {
    console.log('Add new tab clicked');
    toast({
      title: "New Tab",
      description: "Add new tab functionality triggered",
    });
  };

  const handleFilterApply = (filters: Record<string, string>) => {
    console.log('Filters applied:', filters);
    setShowFilter(false);
    toast({
      title: "Filters Applied",
      description: `Applied ${Object.keys(filters).length} filters`,
    });
  };

  const getCurrentCellValue = () => {
    if (!selectedCell) return '';
    const row = data.find(r => r.id === selectedCell.row);
    return row ? String(row[selectedCell.col as keyof TableRow]) : '';
  };

  const columns = [
    { key: 'id', label: '#' },
    { key: 'jobRequest', label: 'Job Request' },
    { key: 'submitted', label: 'Submitted' },
    { key: 'status', label: 'Status' },
    { key: 'submitter', label: 'Submitter' },
    { key: 'url', label: 'URL' },
    { key: 'assigned', label: 'Assigned' },
    { key: 'priority', label: 'Priority' },
    { key: 'dueDate', label: 'Due Date' },
    { key: 'estValue', label: 'Est. Value' }
  ];

  return (
    <div className="h-screen flex flex-col bg-background">
      <SpreadsheetTabs onTabChange={handleTabChange} onTabAdd={handleTabAdd} />
      
      <SpreadsheetToolbar 
        onAction={handleToolbarAction}
        data={data}
        selectedRows={[]}
      />
      
      <FormulaBar 
        selectedCell={selectedCell}
        cellValue={getCurrentCellValue()}
        onValueChange={(value) => {
          if (selectedCell) {
            handleCellEdit(selectedCell.row, selectedCell.col, value);
          }
        }}
        onFormulaSubmit={handleFormulaSubmit}
      />
      
      <SpreadsheetTable 
        data={data}
        onCellClick={(rowId, columnKey) => {
          handleCellClick(rowId, columnKey);
          setSelectedCell({ row: rowId, col: columnKey });
        }}
        onCellDoubleClick={handleCellDoubleClick}
        onCellEdit={handleCellEdit}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />
      
      {showFilter && (
        <AdvancedFilter 
          columns={columns}
          onFilter={handleFilterApply}
          onClose={() => setShowFilter(false)}
        />
      )}
    </div>
  );
};