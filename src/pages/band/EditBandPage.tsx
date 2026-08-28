import { Container, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import BandForm from '../../components/BandForm';
import { api, type UpdateBand } from '../../services/api';
import { useBandById } from '../../hooks/useBands';

interface BandFormData {
  name: string;
}

export default function EditBandPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { band, loading, error } = useBandById(id);

  const onFormSubmit = async (data: BandFormData) => {
    if (!id) return;
    
    try {
      const bandData: UpdateBand = {
        id: parseInt(id),
        name: data.name
      };
      await api.updateBand(bandData);
      navigate('/bands');
    } catch (err) {
      console.error('Error updating band:', err);
    }
  };

  if (loading) {
    return (
      <Container className="mt-4">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error || !band) {
    return (
      <Container className="mt-4">
        <p>Erro ao carregar banda.</p>
      </Container>
    );
  }

  const initialData: Partial<BandFormData> = {
    name: band.name
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Editar Banda</h1>
      <BandForm onSubmit={onFormSubmit} initialData={initialData} submitLabel="Atualizar" />
    </Container>
  );
}
