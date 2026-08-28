import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MusicTemperatureForm from '../../components/MusicTemperatureForm';
import { api, type CreateMusicTemperature } from '../../services/api';

interface MusicTemperatureFormData {
  name: string;
}

export default function AddMusicTemperaturePage() {
  const navigate = useNavigate();

  const onFormSubmit = async (data: MusicTemperatureFormData) => {
    try {
      const musicTemperatureData: CreateMusicTemperature = {
        name: data.name
      };
      await api.createMusicTemperature(musicTemperatureData);
      navigate('/music-temperatures');
    } catch (err) {
      console.error('Error creating music temperature:', err);
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Adicionar Temperatura Musical</h1>
      <MusicTemperatureForm onSubmit={onFormSubmit} />
    </Container>
  );
}
