import { memo } from 'react';
import { cn } from '@/lib/utils';
import { Users, ShoppingCart, Clock } from 'lucide-react';

export type TableStatus = 'empty' | 'ordering' | 'occupied' | 'waiting';

interface TableInfo {
  tableNumber: number;
  status: TableStatus;
  customerCount?: number;
  totalAmount?: number;
  hasActiveOrders?: boolean;
  hasPendingOrders?: boolean;
}

interface TableMapProps {
  tables: TableInfo[];
  onTableClick?: (tableNumber: number) => void;
  className?: string;
}

const statusStyles: Record<TableStatus, { bg: string; border: string; text: string; pulse?: boolean }> = {
  empty: {
    bg: 'bg-muted/30 hover:bg-muted/50',
    border: 'border-border',
    text: 'text-muted-foreground',
  },
  ordering: {
    bg: 'bg-warning/10 hover:bg-warning/20',
    border: 'border-warning',
    text: 'text-warning',
    pulse: true,
  },
  occupied: {
    bg: 'bg-destructive/10 hover:bg-destructive/20',
    border: 'border-destructive',
    text: 'text-destructive',
  },
  waiting: {
    bg: 'bg-success/10 hover:bg-success/20',
    border: 'border-success',
    text: 'text-success',
  },
};

const statusLabels: Record<TableStatus, string> = {
  empty: 'Empty',
  ordering: 'Ordering',
  occupied: 'Occupied',
  waiting: 'Ready',
};

const TableMap = memo(function TableMap({ tables, onTableClick, className }: TableMapProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-xs">
        {Object.entries(statusStyles).map(([status, style]) => (
          <div key={status} className="flex items-center gap-1.5">
            <div className={cn("w-3 h-3 rounded-full border", style.bg, style.border)} />
            <span className="text-muted-foreground capitalize">{statusLabels[status as TableStatus]}</span>
          </div>
        ))}
      </div>
      
      {/* Table Grid */}
      <div className="grid grid-cols-5 gap-3">
        {tables.map((table) => {
          const style = statusStyles[table.status];
          return (
            <button
              key={table.tableNumber}
              onClick={() => onTableClick?.(table.tableNumber)}
              className={cn(
                "relative aspect-square rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-lg group",
                style.bg,
                style.border,
                style.text
              )}
            >
              <span className="text-lg font-bold">{table.tableNumber}</span>
              
              {table.status !== 'empty' && (
                <>
                  <div className="flex items-center gap-1 text-xs mt-1">
                    <Users className="w-3 h-3" />
                    <span>{table.customerCount || 1}</span>
                  </div>
                  
                  {table.totalAmount !== undefined && table.totalAmount > 0 && (
                    <span className="text-[10px] mt-0.5 font-medium">
                      रू{table.totalAmount}
                    </span>
                  )}
                  
                  {/* Status indicator */}
                  <span className={cn(
                    "absolute top-1 right-1 w-2 h-2 rounded-full",
                    table.status === 'ordering' && "bg-warning animate-pulse",
                    table.status === 'occupied' && "bg-destructive",
                    table.status === 'waiting' && "bg-success animate-pulse"
                  )} />
                  
                  {/* Icon indicator */}
                  {table.hasPendingOrders && (
                    <Clock className="absolute top-1 left-1 w-3 h-3 text-warning" />
                  )}
                  {table.hasActiveOrders && !table.hasPendingOrders && (
                    <ShoppingCart className="absolute top-1 left-1 w-3 h-3 text-primary" />
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
});

export { TableMap };
export type { TableInfo, TableMapProps };
