interface PriorityIndicatorProps {
  priority: 'High' | 'Medium' | 'Low';
  className?: string;
}

export const PriorityIndicator = ({ priority, className = '' }: PriorityIndicatorProps) => {
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-priority-high font-semibold';
      case 'Medium':
        return 'text-priority-medium font-medium';
      case 'Low':
        return 'text-priority-low font-normal';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <span className={`text-sm ${getPriorityStyles(priority)} ${className}`}>
      {priority}
    </span>
  );
};