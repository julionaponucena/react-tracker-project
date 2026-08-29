import { Container, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MusicTemperatureForm from '../../components/MusicTemperatureForm';
import { api, type CreateMusicTemperature } from '../../services/api';

interface MusicTemperatureFormData {
  name: string;
}

export default function AddMusicTemperaturePage() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onFormSubmit = async (data: MusicTemperatureFormData) => {
    setSubmitError(null);
    try {
      const musicTemperatureData: CreateMusicTemperature = {
        name: data.name
      };
      await api.createMusicTemperature(musicTemperatureData);
      navigate('/music-temperatures');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Erro ao criar temperatura musical');
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Adicionar Temperatura Musical</h1>
      {submitError && <Alert variant="danger">{submitError}</Alert>}
      <MusicTemperatureForm onSubmit={onFormSubmit} />
    </Container>
  );
}
