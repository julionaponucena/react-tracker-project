import { useState, useEffect } from 'react';
import {api, type ListMusicTemperature, type FindMusicTemperature} from '../services/api';

type UseMusicTemperaturesResult = {
  musicTemperatures: ListMusicTemperature[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

type UseMusicTemperatureByIdResult = {
  musicTemperature: FindMusicTemperature | null;
  loading: boolean;
  error: string | null;
}

export function useMusicTemperatures(): UseMusicTemperaturesResult {
  const [musicTemperatures, setMusicTemperatures] = useState<ListMusicTemperature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMusicTemperatures = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getMusicTemperatures();
      setMusicTemperatures(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar temperaturas musicais');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => fetchMusicTemperatures(), 0);
  }, []);

  return { musicTemperatures, loading, error, refetch: fetchMusicTemperatures };
}

export function useMusicTemperatureById(id: string | undefined): UseMusicTemperatureByIdResult {
  const [musicTemperature, setMusicTemperature] = useState<FindMusicTemperature | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setTimeout(() => setLoading(false), 0);
      return;
    }

    const fetchMusicTemperature = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getMusicTemperatureById(id);
        setMusicTemperature(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar temperatura musical');
      } finally {
        setLoading(false);
      }
    };

    fetchMusicTemperature().catch(err => {
      console.error('Unhandled promise rejection:', err);
    });
  }, [id]);

  return { musicTemperature, loading, error };
}
