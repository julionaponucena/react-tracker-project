import { useState, useEffect } from 'react';
import {api, type FindMoment, type ListMoment} from '../services/api';

type UseMomentsResult = {
  moments: ListMoment[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

type UseMomentResult = {
  moment: FindMoment | null;
  loading: boolean;
  error: string | null;
}

export function useMoments(): UseMomentsResult {
  const [moments, setMoments] = useState<ListMoment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMoments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getMoments();
      setMoments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar momentos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => fetchMoments(), 0);
  }, []);

  return { moments, loading, error, refetch: fetchMoments };
}

export function useMoment(id: string | undefined): UseMomentResult {
  const [moment, setMoment] = useState<FindMoment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setTimeout(() => setLoading(false), 0);
      return;
    }

    const fetchMoment = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getMomentById(id);
        setMoment(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar momento');
      } finally {
        setLoading(false);
      }
    };

    fetchMoment().catch(err => {
      console.error('Unhandled promise rejection:', err);
    });
  }, [id]);

  return { moment, loading, error };
}
