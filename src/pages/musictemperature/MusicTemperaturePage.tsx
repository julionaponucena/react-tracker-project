import {Button, Container, Table, Spinner, Alert, Modal} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useMusicTemperatures } from '../../hooks/useMusicTemperatures.ts'
import { api } from '../../services/api.ts'
import { useState } from 'react'

function MusicTemperaturePage() {
  const {musicTemperatures,loading,error,refetch} = useMusicTemperatures()
  const [showModal, setShowModal] = useState(false)
  const [musicTemperatureToDelete, setMusicTemperatureToDelete] = useState<number | null>(null)

  const handleDeleteClick = (id: number) => {
    setMusicTemperatureToDelete(id)
    setShowModal(true)
  }

  const handleConfirmDelete = async () => {
    if (musicTemperatureToDelete !== null) {
      try {
        await api.deleteMusicTemperature(musicTemperatureToDelete)
        setShowModal(false)
        setMusicTemperatureToDelete(null)
        refetch()
      } catch (err) {
        console.error('Error deleting music temperature:', err)
      }
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setMusicTemperatureToDelete(null)
  }

  return (
    <Container>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {musicTemperatures &&
          <>
            <h1 className="mb-5">Temperaturas Musicais</h1>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
            {musicTemperatures.length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center text-muted">
                    Nenhuma temperatura musical encontrada
                  </td>
                </tr>
            ) : (
                musicTemperatures.map((musicTemperature) => (
                    <tr key={musicTemperature.id}>
                      <td>{musicTemperature.name}</td>
                      <td style={{display: 'flex', gap: '16px'}}>
                        <Link to={"/music-temperatures/edit/" + musicTemperature.id}>
                          <Button variant='success'>Editar</Button>
                        </Link>
                        <Button variant='danger' onClick={() => handleDeleteClick(musicTemperature.id)}>Excluir</Button>
                      </td>
                    </tr>
                ))
            )}
            </tbody>
          </Table>
          </>
      }
      <Link to='/music-temperatures/add'>
        <Button variant="primary">Adicionar temperatura musical</Button>
      </Link>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir esta temperatura musical?
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

export default MusicTemperaturePage
