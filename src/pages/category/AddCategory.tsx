import { Container, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, type CreateCategory } from '../../services/api.ts';
import CategoryForm from '../../components/CategoryForm.tsx';

export default function AddCategory() {
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleSubmit = async (data: { name: string; value: number; momentIds?: number[] }) => {
        setSubmitError(null);

        try {
            const createData: CreateCategory = {
                name: data.name,
                value: data.value,
                momentIds: data.momentIds
            };
            await api.createCategory(createData);
            navigate('/categories');
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : 'Erro ao criar categoria');
        }
    };

    return (
        <Container className="mt-4">
            <h1>Nova Categoria</h1>
            {submitError && <Alert variant="danger">{submitError}</Alert>}
            <CategoryForm 
                onSubmit={handleSubmit}
                submitLabel="Criar"
            />
        </Container>
    );
}
