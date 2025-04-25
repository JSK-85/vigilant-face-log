
import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface LogEntry {
  id: string;
  userId: string | null;
  userName: string;
  userImage: string | null;
  eventType: string;
  location: string;
  timestamp: string;
  confidence: number;
}

interface LogsTableProps {
  logs: LogEntry[];
}

const LogsTable: React.FC<LogsTableProps> = ({ logs }) => {
  const getEventBadgeVariant = (eventType: string) => {
    switch (eventType) {
      case 'Entry':
        return 'default';
      case 'Exit':
        return 'outline';
      case 'Failed Recognition':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Confidence</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No log entries found
              </TableCell>
            </TableRow>
          ) : (
            logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {log.userImage ? (
                      <img
                        src={log.userImage}
                        alt={log.userName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs">
                        {log.userName.charAt(0)}
                      </div>
                    )}
                    <span className={!log.userId ? 'text-muted-foreground' : ''}>
                      {log.userName}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getEventBadgeVariant(log.eventType)}>
                    {log.eventType}
                  </Badge>
                </TableCell>
                <TableCell>{log.location}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm">
                      {format(new Date(log.timestamp), 'MMM d, h:mm a')}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          log.confidence > 0.7
                            ? 'bg-green-500'
                            : log.confidence > 0.5
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${log.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(log.confidence * 100)}%
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LogsTable;
