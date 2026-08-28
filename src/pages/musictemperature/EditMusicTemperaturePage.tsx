import { Container, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import MusicTemperatureForm from '../../components/MusicTemperatureForm';
import { api, type UpdateMusicTemperature } from '../../services/api';
import { useMusicTemperatureById } from '../../hooks/useMusicTemperatures';

interface MusicTemperatureFormData {
  name: string;
}

export default function EditMusicTemperaturePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { musicTemperature, loading, error } = useMusicTemperatureById(id);

  const onFormSubmit = async (data: MusicTemperatureFormData) => {
    if (!id) return;
    
    try {
      const musicTemperatureData: UpdateMusicTemperature = {
        id: parseInt(id),
        name: data.name
      };
      await api.updateMusicTemperature(musicTemperatureData);
      navigate('/music-temperatures');
    } catch (err) {
      console.error('Error updating music temperature:', err);
    }
  };

  if (loading) {
    return (
      <Container className="mt-4">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error || !musicTemperature) {
    return (
      <Container className="mt-4">
        <p>Erro ao carregar temperatura musical.</p>
      </Container>
    );
  }

  const initialData: Partial<MusicTemperatureFormData> = {
    name: musicTemperature.name
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Editar Temperatura Musical</h1>
      <MusicTemperatureForm onSubmit={onFormSubmit} initialData={initialData} submitLabel="Atualizar" />
    </Container>
  );
}
