import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface FormulaBarProps {
  selectedCell: { row: number; col: string } | null;
  cellValue: string;
  onValueChange: (value: string) => void;
  onFormulaSubmit: (formula: string) => void;
}

export const FormulaBar = ({ selectedCell, cellValue, onValueChange, onFormulaSubmit }: FormulaBarProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formula, setFormula] = useState(cellValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setFormula(cellValue);
  }, [cellValue]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setFormula(cellValue);
    }
  };

  const handleSubmit = () => {
    setIsEditing(false);
    onValueChange(formula);
    
    if (formula.startsWith('=')) {
      onFormulaSubmit(formula);
      toast({
        title: "Formula Applied",
        description: `Formula ${formula} calculated for cell`,
      });
    }
  };

  const getCellReference = () => {
    if (!selectedCell) return 'A1';
    const colLetter = selectedCell.col.charAt(0).toUpperCase() + selectedCell.col.slice(1);
    return `${colLetter}${selectedCell.row}`;
  };

  return (
    <div className="flex items-center space-x-4 p-3 bg-toolbar-bg border-b border-toolbar-border">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-mono text-muted-foreground min-w-[50px]">
          {getCellReference()}
        </span>
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs"
          onClick={() => setIsEditing(!isEditing)}
        >
          fx
        </Button>
      </div>
      
      <div className="flex-1">
        {isEditing ? (
          <Input
            ref={inputRef}
            value={formula}
            onChange={(e) => setFormula(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSubmit}
            className="h-8 text-sm font-mono"
            placeholder="Enter formula (e.g., =SUM(A1:A5))"
          />
        ) : (
          <div
            className="h-8 px-3 py-1 text-sm font-mono bg-background border border-input rounded-md cursor-text flex items-center"
            onClick={() => setIsEditing(true)}
          >
            {formula || 'Click to edit...'}
          </div>
        )}
      </div>
    </div>
  );
};