import { useState, useEffect } from 'react';
import {api, type FindMusic, type ListMusic} from '../services/api';

type UseMusicResult = {
  music: ListMusic[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

type UseMusicByIdResult = {
  music: FindMusic | null;
  loading: boolean;
  error: string | null;
}

export function useMusic(): UseMusicResult {
  const [music, setMusic] = useState<ListMusic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMusic = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getMusic();
      setMusic(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar músicas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => fetchMusic(), 0);
  }, []);

  return { music, loading, error, refetch: fetchMusic };
}

export function useMusicById(id: string | undefined): UseMusicByIdResult {
  const [music, setMusic] = useState<FindMusic| null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setTimeout(() => setLoading(false), 0);
      return;
    }

    const fetchMusic = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getMusicById(id);
        setMusic(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar música');
      } finally {
        setLoading(false);
      }
    };

    fetchMusic().catch(err => {
      console.error('Unhandled promise rejection:', err);
    });
  }, [id]);

  return { music, loading, error };
}
