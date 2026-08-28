import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BandForm from '../../components/BandForm';
import { api, type CreateBand } from '../../services/api';

interface BandFormData {
  name: string;
}

export default function AddBandPage() {
  const navigate = useNavigate();

  const onFormSubmit = async (data: BandFormData) => {
    try {
      const bandData: CreateBand = {
        name: data.name
      };
      await api.createBand(bandData);
      navigate('/bands');
    } catch (err) {
      console.error('Error creating band:', err);
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Adicionar Banda</h1>
      <BandForm onSubmit={onFormSubmit} />
    </Container>
  );
}
