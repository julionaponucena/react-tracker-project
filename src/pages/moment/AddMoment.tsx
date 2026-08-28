import { Container, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, type CreateMoment } from '../../services/api.ts';
import MomentForm from '../../components/MomentForm.tsx';

export default function AddMoment() {
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleSubmit = async (data: CreateMoment) => {
        setSubmitError(null);

        try {
            await api.createMoment(data);
            navigate('/moments');
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : 'Erro ao criar momento');
        }
    };

    return (
        <Container className="mt-4">
            <h1>Novo Momento</h1>
            {submitError && <Alert variant="danger">{submitError}</Alert>}
            <MomentForm 
                onSubmit={handleSubmit}
                submitLabel="Criar"
            />
        </Container>
    );
}
