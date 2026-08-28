import {Button, Container, Table, Spinner, Alert, Modal} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useBands } from '../../hooks/useBands.ts'
import { api } from '../../services/api.ts'
import { useState } from 'react'

function BandPage() {
  const {bands,loading,error,refetch} = useBands()
  const [showModal, setShowModal] = useState(false)
  const [bandToDelete, setBandToDelete] = useState<number | null>(null)

  const handleDeleteClick = (id: number) => {
    setBandToDelete(id)
    setShowModal(true)
  }

  const handleConfirmDelete = async () => {
    if (bandToDelete !== null) {
      try {
        await api.deleteBand(bandToDelete)
        setShowModal(false)
        setBandToDelete(null)
        refetch()
      } catch (err) {
        console.error('Error deleting band:', err)
      }
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setBandToDelete(null)
  }

  return (
    <Container>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {bands &&
          <>
            <h1 className="mb-5">Bandas</h1>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
            {bands.length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center text-muted">
                    Nenhuma banda encontrada
                  </td>
                </tr>
            ) : (
                bands.map((band) => (
                    <tr key={band.id}>
                      <td>{band.name}</td>
                      <td style={{display: 'flex', gap: '16px'}}>
                        <Link to={"/bands/edit/" + band.id}>
                          <Button variant='success'>Editar</Button>
                        </Link>
                        <Button variant='danger' onClick={() => handleDeleteClick(band.id)}>Excluir</Button>
                      </td>
                    </tr>
                ))
            )}
            </tbody>
          </Table>
          </>
      }
      <Link to='/bands/add'>
        <Button variant="primary">Adicionar banda</Button>
      </Link>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir esta banda?
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

export default BandPage
