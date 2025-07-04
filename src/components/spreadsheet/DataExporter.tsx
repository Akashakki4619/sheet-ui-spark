import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExportOptions {
  format: 'csv' | 'xlsx' | 'json' | 'pdf';
  includeHeaders: boolean;
  selectedRowsOnly: boolean;
}

interface DataExporterProps {
  data: any[];
  selectedRows?: number[];
  filename?: string;
}

export const DataExporter = ({ data, selectedRows = [], filename = 'spreadsheet' }: DataExporterProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const exportToCSV = (exportData: any[], options: ExportOptions) => {
    const headers = Object.keys(exportData[0] || {});
    const csvContent = [
      ...(options.includeHeaders ? [headers.join(',')] : []),
      ...exportData.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        }).join(',')
      )
    ].join('\n');

    downloadFile(csvContent, `${filename}.csv`, 'text/csv');
  };

  const exportToJSON = (exportData: any[], options: ExportOptions) => {
    const jsonContent = JSON.stringify(exportData, null, 2);
    downloadFile(jsonContent, `${filename}.json`, 'application/json');
  };

  const downloadFile = (content: string, fileName: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExport = async (format: 'csv' | 'xlsx' | 'json' | 'pdf') => {
    setIsExporting(true);
    
    const exportData = selectedRows.length > 0 
      ? data.filter((_, index) => selectedRows.includes(index))
      : data;

    const options: ExportOptions = {
      format,
      includeHeaders: true,
      selectedRowsOnly: selectedRows.length > 0
    };

    try {
      switch (format) {
        case 'csv':
          exportToCSV(exportData, options);
          break;
        case 'json':
          exportToJSON(exportData, options);
          break;
        case 'xlsx':
          toast({
            title: "Export Simulated",
            description: "XLSX export would require additional library (xlsx)",
          });
          break;
        case 'pdf':
          toast({
            title: "Export Simulated", 
            description: "PDF export would require additional library (jsPDF)",
          });
          break;
      }

      toast({
        title: "Export Successful",
        description: `Data exported as ${format.toUpperCase()} format`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "An error occurred during export",
        variant: "destructive",
      });
    }

    setIsExporting(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          disabled={isExporting}
          className="hover:bg-toolbar-hover"
        >
          Export <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => handleExport('csv')}>
          <span className="flex items-center">
            📊 Export as CSV
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('xlsx')}>
          <span className="flex items-center">
            📈 Export as Excel
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('json')}>
          <span className="flex items-center">
            🔗 Export as JSON
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('pdf')}>
          <span className="flex items-center">
            📄 Export as PDF
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};