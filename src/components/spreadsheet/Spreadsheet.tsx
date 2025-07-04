import { useState } from 'react';
import { SpreadsheetToolbar } from './SpreadsheetToolbar';
import { SpreadsheetTable, TableRow } from './SpreadsheetTable';
import { SpreadsheetTabs } from './SpreadsheetTabs';
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
      'filter': 'Filter panel opened',
      'cell-view': 'Cell view mode toggled',
      'import': 'Import dialog opened',
      'export': 'Export options displayed',
      'share': 'Share dialog opened',
      'new-action': 'New action dialog opened'
    };

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

  return (
    <div className="h-screen flex flex-col bg-background">
      <SpreadsheetTabs onTabChange={handleTabChange} onTabAdd={handleTabAdd} />
      <SpreadsheetToolbar onAction={handleToolbarAction} />
      <SpreadsheetTable 
        data={data}
        onCellClick={handleCellClick}
        onCellDoubleClick={handleCellDoubleClick}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />
    </div>
  );
};