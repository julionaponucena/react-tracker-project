import { Container } from 'react-bootstrap';
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
  musicTemperatureId?: number;
}

export default function AddMusicPage() {
  const navigate = useNavigate();

  const onFormSubmit = async (data: MusicFormData) => {
    try {
      const musicData: CreateMusic = {
        name: data.name,
        band: data.band,
        momentIds: data.momentIds,
        musicTemperature: data.musicTemperatureId ? { id: data.musicTemperatureId } : undefined
      };
      await api.createMusic(musicData);
      navigate('/musics');
    } catch (err) {
      console.error('Error creating music:', err);
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Adicionar Música</h1>
      <MusicForm onSubmit={onFormSubmit} />
    </Container>
  );
}
