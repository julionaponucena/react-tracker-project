import {Container, Table, Spinner, Alert, Modal, Button} from "react-bootstrap";
import {Link} from 'react-router-dom';
import { useMoments } from '../../hooks/useMoments';
import {api} from '../../services/api';
import {useState} from 'react';

export default function MomentPage(){
    const {moments, loading, error, refetch} = useMoments();
    const [showModal, setShowModal] = useState(false);
    const [momentToDelete, setMomentToDelete] = useState<number | null>(null);

    const handleDeleteClick = (id: number) => {
        setMomentToDelete(id);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        if (momentToDelete !== null) {
            try {
                await api.deleteMoment(momentToDelete);
                setShowModal(false);
                setMomentToDelete(null);
                refetch();
            } catch (err) {
                console.error('Error deleting moment:', err);
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setMomentToDelete(null);
    };

    return (
        <Container>
            <h1>Momentos</h1>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {moments && (
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {moments.length === 0 ? (
                            <tr>
                                <td colSpan={2} className="text-center text-muted">
                                    Nenhum momento encontrado
                                </td>
                            </tr>
                        ) : (
                            moments.map((moment) => (
                                <tr key={moment.id}>
                                    <td>{moment.name}</td>
                                    <td style={{display: 'flex', gap: '16px'}}>
                                        <Link to={"/moments/edit/" + moment.id}>
                                            <Button variant='success'>Editar</Button>
                                        </Link>
                                        <Button variant='danger' onClick={() => handleDeleteClick(moment.id)}>Excluir</Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            )}
            <Link to='/moments/add'>
                <Button variant="primary">Adicionar momento</Button>
            </Link>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza que deseja excluir este momento?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
