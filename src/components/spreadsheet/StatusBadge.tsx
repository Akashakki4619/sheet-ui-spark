interface StatusBadgeProps {
  status: 'In-process' | 'Need to start' | 'Complete' | 'Blocked';
  className?: string;
}

export const StatusBadge = ({ status, className = '' }: StatusBadgeProps) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Complete':
        return 'bg-status-complete-bg text-status-complete border-status-complete/20';
      case 'In-process':
        return 'bg-status-in-process-bg text-status-in-process border-status-in-process/20';
      case 'Need to start':
        return 'bg-status-need-start-bg text-status-need-start border-status-need-start/20';
      case 'Blocked':
        return 'bg-status-blocked-bg text-status-blocked border-status-blocked/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <span 
      className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getStatusStyles(status)} ${className}`}
    >
      {status}
    </span>
  );
};