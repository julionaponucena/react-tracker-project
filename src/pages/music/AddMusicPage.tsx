import { useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MusicForm from '../../components/MusicForm';
import { api, type CreateMusic } from '../../services/api';

interface MusicFormData {
  name: string;
  band: {
    id: number;
    name: string;
  };
  momentIds: number[];
  musicTemperature?: number;
}

export default function AddMusicPage() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onFormSubmit = async (data: MusicFormData) => {
    setSubmitError(null);
    try {
      const musicData: CreateMusic = {
        name: data.name,
        band: data.band,
        momentIds: data.momentIds,
        musicTemperature: data.musicTemperature ? { id: data.musicTemperature } : undefined
      };
      await api.createMusic(musicData);
      navigate('/musics');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Erro ao criar música');
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Adicionar Música</h1>
      {submitError && <Alert variant="danger">{submitError}</Alert>}
      <MusicForm onSubmit={onFormSubmit} />
    </Container>
  );
}
