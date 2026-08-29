import {Button, Container, Table, Spinner, Alert, Modal} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useMusic } from '../../hooks/useMusic.ts'
import { api } from '../../services/api.ts'
import { useState } from 'react'

function MusicPage() {
  const {music,loading,error,refetch} = useMusic()
  const [showModal, setShowModal] = useState(false)
  const [musicToDelete, setMusicToDelete] = useState<number | null>(null)
  const handleDeleteClick = (id: number) => {
    setMusicToDelete(id)
    setShowModal(true)
  }

  const handleConfirmDelete = async () => {
    if (musicToDelete !== null) {
      try {
        await api.deleteMusic(musicToDelete)
        setShowModal(false)
        setMusicToDelete(null)
        refetch()
      } catch (err) {
        console.error('Error deleting music:', err)
      }
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setMusicToDelete(null)
  }

  return (
    <Container>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {music &&
          <>
            <h1 className="mb-5">Músicas</h1>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Banda</th>
                  <th>Momento</th>
                  {/*Campo para medir a compatibilidade das músicas*/}
                  <td>Temperatura da Música</td>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
            {music.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-muted">
                    Nenhuma música encontrada
                  </td>
                </tr>
            ) : (
                music.map((musicItem) => (
                    <tr key={musicItem.id}>
                      <td>{musicItem.name}</td>
                      <td>{musicItem.band.name}</td>
                      <td>{musicItem.moments.map(m => m.name).join(', ')}</td>
                      <td>{musicItem.musicTemperature ? musicItem.musicTemperature.name : ''}</td>
                      <td style={{display: 'flex', gap: '16px'}}>
                        <Link to={"/musics/edit/" + musicItem.id}>
                          <Button variant='success'>Editar</Button>
                        </Link>
                        <Button variant='danger' onClick={() => handleDeleteClick(musicItem.id)}>Excluir</Button>
                      </td>
                    </tr>
                ))
            )}
            </tbody>
          </Table>
          </>
      }
      <Link to='/musics/add'>
        <Button variant="primary">Adicionar música</Button>
      </Link>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir esta música?
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

export default MusicPage
