import {Alert, Container, Spinner} from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom';
import {useState} from 'react';
import {useCategory} from '../../hooks/useCategories.ts';
import {api} from '../../services/api.ts';
import CategoryForm from '../../components/CategoryForm.tsx';

export default function EditCategory() {
    const { id } = useParams();
    const { category, loading, error } = useCategory(id);
    const navigate = useNavigate()
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleSubmit = async (data: { name: string; value: number; momentIds?: number[] }) => {
        if (!id) {
            return;
        }

        setSubmitError(null);

        try {
            await api.updateCategory({ id: parseInt(id), ...data });
            navigate("/categories")
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : 'Erro ao atualizar categoria');
        }
    };

    return (
        <Container className="mt-4">
            <h1>Formulário</h1>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {submitError && <Alert variant="danger">{submitError}</Alert>}
            {!loading && !error && (
                <CategoryForm 
                    initialData={category ? {
                        name: category.name,
                        value: category.value,
                        moments:category.moments
                    } : undefined} 
                    onSubmit={handleSubmit}
                    submitLabel={id ? 'Atualizar' : 'Criar'}
                />
            )}
        </Container>
    );
}
