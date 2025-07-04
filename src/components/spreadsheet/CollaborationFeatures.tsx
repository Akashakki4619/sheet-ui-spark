import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface CollaborationFeature {
  userId: string;
  userName: string;
  color: string;
  currentCell?: { row: number; col: string };
  lastActivity: number;
}

export const useCollaboration = () => {
  const [activeUsers, setActiveUsers] = useState<CollaborationFeature[]>([
    {
      userId: 'user1',
      userName: 'John Doe',
      color: '#3B82F6',
      currentCell: { row: 2, col: 'jobRequest' },
      lastActivity: Date.now()
    },
    {
      userId: 'user2', 
      userName: 'Sarah Wilson',
      color: '#10B981',
      currentCell: { row: 4, col: 'status' },
      lastActivity: Date.now() - 30000
    }
  ]);
  const { toast } = useToast();

  const updateUserActivity = (userId: string, cellPosition?: { row: number; col: string }) => {
    setActiveUsers(prev => prev.map(user => 
      user.userId === userId 
        ? { ...user, currentCell: cellPosition, lastActivity: Date.now() }
        : user
    ));
  };

  const simulateCollaborativeEdit = (rowId: number, columnKey: string, newValue: string) => {
    const randomUser = activeUsers[Math.floor(Math.random() * activeUsers.length)];
    
    toast({
      title: "Collaborative Edit",
      description: `${randomUser.userName} edited cell ${columnKey}${rowId}`,
    });
  };

  // Simulate user activity updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => prev.map(user => ({
        ...user,
        currentCell: Math.random() > 0.7 ? {
          row: Math.floor(Math.random() * 5) + 1,
          col: ['jobRequest', 'status', 'priority'][Math.floor(Math.random() * 3)]
        } : user.currentCell
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const CollaboratorIndicators = ({ rowId, columnKey }: { rowId: number; columnKey: string }) => {
    const usersInCell = activeUsers.filter(user => 
      user.currentCell?.row === rowId && user.currentCell?.col === columnKey
    );

    if (usersInCell.length === 0) return null;

    return (
      <div className="absolute -top-1 -right-1 flex space-x-1">
        {usersInCell.map(user => (
          <div
            key={user.userId}
            className="w-3 h-3 rounded-full border-2 border-white shadow-sm animate-pulse"
            style={{ backgroundColor: user.color }}
            title={`${user.userName} is here`}
          />
        ))}
      </div>
    );
  };

  const ActiveUsersList = () => (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">Active:</span>
      {activeUsers.map(user => (
        <div key={user.userId} className="flex items-center space-x-1">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: user.color }}
          />
          <span className="text-xs text-muted-foreground">{user.userName}</span>
        </div>
      ))}
    </div>
  );

  return {
    activeUsers,
    updateUserActivity,
    simulateCollaborativeEdit,
    CollaboratorIndicators,
    ActiveUsersList
  };
};