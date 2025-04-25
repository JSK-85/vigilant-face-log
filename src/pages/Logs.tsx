
import React, { useState, useEffect } from 'react';
import { generateMockLogs } from '@/utils/faceDetection';
import LogsTable from '@/components/LogsTable';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Download } from 'lucide-react';

const Logs = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventFilter, setEventFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  useEffect(() => {
    // Generate mock log data
    const generatedLogs = generateMockLogs(50);
    setLogs(generatedLogs);
    setFilteredLogs(generatedLogs);
  }, []);

  useEffect(() => {
    let result = logs;
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        log => log.userName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by event type
    if (eventFilter !== 'all') {
      result = result.filter(log => log.eventType === eventFilter);
    }
    
    // Filter by location
    if (locationFilter !== 'all') {
      result = result.filter(log => log.location === locationFilter);
    }
    
    setFilteredLogs(result);
  }, [logs, searchQuery, eventFilter, locationFilter]);

  // Get unique event types and locations for filters
  const eventTypes = ['all', ...Array.from(new Set(logs.map(log => log.eventType)))];
  const locations = ['all', ...Array.from(new Set(logs.map(log => log.location)))];

  // Export logs as CSV (mock function)
  const handleExportCSV = () => {
    const headers = ['ID', 'User', 'Event', 'Location', 'Timestamp', 'Confidence'];
    
    const csvData = filteredLogs.map(log => [
      log.id,
      log.userName,
      log.eventType,
      log.location,
      log.timestamp,
      (log.confidence * 100).toFixed(1) + '%'
    ]);
    
    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'face_recognition_logs.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Access Logs</h1>
      
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div>
          <Select value={eventFilter} onValueChange={setEventFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by event" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {eventTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === 'all' ? 'All Events' : type}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing {filteredLogs.length} of {logs.length} log entries
        </p>
        <Button variant="outline" onClick={handleExportCSV}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>
      
      <LogsTable logs={filteredLogs} />
    </div>
  );
};

export default Logs;
