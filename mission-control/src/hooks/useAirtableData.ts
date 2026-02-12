"use client";

import { useState, useEffect } from 'react';

interface DealCategory {
  count: number;
  revenue: number;
  deals: Array<{
    id: string;
    address: string;
    revenue: number;
    date: string;
    status: string;
  }>;
}

interface AirtableData {
  // Legacy fields for compatibility
  totalRevenue: number;
  dealsCount: number;
  last24h: number;
  deals: Array<{
    id: string;
    address: string;
    revenue: number;
    date: string;
    status: string;
  }>;
  
  // New detailed breakdown
  offerMade: DealCategory;
  pendingContract: DealCategory;
  inContract: DealCategory;
  timestamp: string;
}

interface AirtableError {
  error: string;
  timestamp: string;
}

type AirtableResponse = AirtableData | AirtableError;

function isError(response: AirtableResponse): response is AirtableError {
  return 'error' in response;
}

export function useAirtableData() {
  const [data, setData] = useState<AirtableData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/airtable');
      const result: AirtableResponse = await response.json();
      
      if (isError(result)) {
        setError(result.error);
        setData(null);
      } else {
        setData(result);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto-refresh every 15 minutes
    const interval = setInterval(fetchData, 15 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Manual refresh function
  const refresh = () => {
    fetchData();
  };

  return {
    data,
    loading,
    error,
    refresh
  };
}