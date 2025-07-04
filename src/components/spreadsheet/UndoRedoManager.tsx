import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Action {
  type: 'CELL_EDIT' | 'ROW_DELETE' | 'ROW_INSERT' | 'SORT' | 'FILTER';
  data: any;
  timestamp: number;
}

interface UndoRedoManagerProps {
  onUndo: (action: Action) => void;
  onRedo: (action: Action) => void;
}

export const UndoRedoManager = ({ onUndo, onRedo }: UndoRedoManagerProps) => {
  const [undoStack, setUndoStack] = useState<Action[]>([]);
  const [redoStack, setRedoStack] = useState<Action[]>([]);
  const { toast } = useToast();

  const addAction = (action: Action) => {
    setUndoStack(prev => [...prev, action]);
    setRedoStack([]); // Clear redo stack when new action is added
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    
    const lastAction = undoStack[undoStack.length - 1];
    setUndoStack(prev => prev.slice(0, -1));
    setRedoStack(prev => [...prev, lastAction]);
    
    onUndo(lastAction);
    toast({
      title: "Action Undone",
      description: `Undid ${lastAction.type.toLowerCase().replace('_', ' ')}`,
    });
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    
    const lastUndone = redoStack[redoStack.length - 1];
    setRedoStack(prev => prev.slice(0, -1));
    setUndoStack(prev => [...prev, lastUndone]);
    
    onRedo(lastUndone);
    toast({
      title: "Action Redone",
      description: `Redid ${lastUndone.type.toLowerCase().replace('_', ' ')}`,
    });
  };

  return {
    addAction,
    canUndo: undoStack.length > 0,
    canRedo: redoStack.length > 0,
    UndoRedoControls: () => (
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          disabled={undoStack.length === 0}
          onClick={handleUndo}
          className="hover:bg-toolbar-hover"
          title="Undo (Ctrl+Z)"
        >
          ↶ Undo
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled={redoStack.length === 0}
          onClick={handleRedo}
          className="hover:bg-toolbar-hover"
          title="Redo (Ctrl+Y)"
        >
          ↷ Redo
        </Button>
      </div>
    )
  };
};