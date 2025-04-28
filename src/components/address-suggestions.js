'use client';

import { useState, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { MapPin, Loader2 } from "lucide-react";
import { debounce } from 'lodash';

export function AddressSuggestions({ onSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAddresses = useCallback(
    debounce(async (postcode) => {
      if (!postcode || postcode.length < 3) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://api.postcodes.io/postcodes/${postcode}/autocomplete`);
        const data = await response.json();

        if (data.status === 200 && data.result) {
          const addresses = await Promise.all(
            data.result.map(async (postcode) => {
              const detailResponse = await fetch(`https://api.postcodes.io/postcodes/${postcode}`);
              const detailData = await detailResponse.json();
              return {
                id: postcode,
                address: detailData.result ? `${detailData.result.line_1}, ${detailData.result.postcode}` : postcode,
                fullAddress: detailData.result
              };
            })
          );
          setSuggestions(addresses);
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        setError('Failed to fetch addresses');
        console.error('Address lookup error:', err);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchAddresses(searchTerm);
    return () => fetchAddresses.cancel();
  }, [searchTerm, fetchAddresses]);

  return (
    <div className="mt-2 space-y-2">
      <div className="relative">
        <Input
          placeholder="Enter postcode..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        {loading ? (
          <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
        ) : (
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {suggestions.length > 0 && (
        <div className="max-h-60 overflow-y-auto border rounded-lg bg-background shadow-lg">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="p-3 hover:bg-accent cursor-pointer border-b last:border-b-0 transition-colors"
              onClick={() => {
                onSelect(suggestion.fullAddress);
                setSearchTerm('');
                setSuggestions([]);
              }}
            >
              <p className="text-sm font-medium">{suggestion.address}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 