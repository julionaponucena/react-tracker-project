import { useState, useEffect } from 'react';
import {api, type FindCategory, type ListCategory} from '../services/api';

type UseCategoriesResult = {
  categories: ListCategory[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

type UseCategoryResult = {
  category: FindCategory | null;
  loading: boolean;
  error: string | null;
}

export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<ListCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar categorias');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => fetchCategories(), 0);
  }, []);

  return { categories, loading, error, refetch: fetchCategories };
}

//toDo validar essa função
export function useCategory(id: string | undefined): UseCategoryResult {
  const [category, setCategory] = useState<FindCategory| null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setTimeout(() => setLoading(false), 0);
      return;
    }

    const fetchCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getCategoryById(id);
        setCategory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar categoria');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory().catch(err => {
      console.error('Unhandled promise rejection:', err);
    });
  }, [id]);

  console.log(category)

  return { category, loading, error };
}
