import { Container, Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useMoment } from '../../hooks/useMoments.ts';
import {api} from '../../services/api.ts';
import MomentForm from '../../components/MomentForm.tsx';

export default function EditMoment() {
    const { id } = useParams();
    const { moment, loading, error } = useMoment(id);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleSubmit = async (data: { name: string }) => {
        if (!id) {
            return;
        }

        setSubmitError(null);

        try {
            await api.updateMoment({ id: parseInt(id), name: data.name });
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : 'Erro ao atualizar momento');
        }
    };

    return (
        <Container className="mt-4">
            <h1>Editar Momento</h1>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {submitError && <Alert variant="danger">{submitError}</Alert>}
            {!loading && !error && (
                <MomentForm 
                    initialData={moment || undefined} 
                    onSubmit={handleSubmit}
                    submitLabel="Atualizar"
                />
            )}
        </Container>
    );
}
