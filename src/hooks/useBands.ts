import { useState, useEffect } from 'react';
import {api, type ListBand, type FindBand} from '../services/api';

type UseBandsResult = {
  bands: ListBand[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

type UseBandByIdResult = {
  band: FindBand | null;
  loading: boolean;
  error: string | null;
}

export function useBands(): UseBandsResult {
  const [bands, setBands] = useState<ListBand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBands = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getBands();
      setBands(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar bandas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => fetchBands(), 0);
  }, []);

  return { bands, loading, error, refetch: fetchBands };
}

export function useBandById(id: string | undefined): UseBandByIdResult {
  const [band, setBand] = useState<FindBand | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setTimeout(() => setLoading(false), 0);
      return;
    }

    const fetchBand = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getBandById(id);
        setBand(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar banda');
      } finally {
        setLoading(false);
      }
    };

    fetchBand().catch(err => {
      console.error('Unhandled promise rejection:', err);
    });
  }, [id]);

  return { band, loading, error };
}
