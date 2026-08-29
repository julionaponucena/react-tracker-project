import { useState } from 'react';
import { Alert, Container, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import MusicForm from '../../components/MusicForm';
import { api, type UpdateMusic } from '../../services/api';
import { useMusicById } from '../../hooks/useMusic';

interface MusicFormData {
  name: string;
  band: {
    id: number;
    name: string;
  };
  momentIds: number[];
  musicTemperature?: number;
}

export default function EditMusicPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { music, loading, error } = useMusicById(id);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onFormSubmit = async (data: MusicFormData) => {
    if (!id) return;
    setSubmitError(null);

    try {
      const musicData: UpdateMusic = {
        id: parseInt(id),
        name: data.name,
        band: data.band,
        momentIds: data.momentIds,
        musicTemperature: data.musicTemperature ? { id: data.musicTemperature } : undefined
      };
      await api.updateMusic(musicData);
      navigate('/musics');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Erro ao atualizar música');
    }
  };

  if (loading) {
    return (
      <Container className="mt-4">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error || !music) {
    return (
      <Container className="mt-4">
        <p>Erro ao carregar música.</p>
      </Container>
    );
  }

  const initialData: Partial<MusicFormData> = {
    name: music.name,
    band: music.band,
    momentIds: music.moments?.map(m => m.id) || [],
    musicTemperature: music.musicTemperature?.id
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Editar Música</h1>
      {submitError && <Alert variant="danger">{submitError}</Alert>}
      <MusicForm onSubmit={onFormSubmit} initialData={initialData} submitLabel="Atualizar" />
    </Container>
  );
}
