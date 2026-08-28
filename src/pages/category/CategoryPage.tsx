import {Button, Container, Table, Spinner, Alert, Modal} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useCategories } from '../../hooks/useCategories.ts'
import { api } from '../../services/api.ts'
import { useState } from 'react'

function CategoryPage() {
  const {categories,loading,error,refetch} =useCategories()
  const [showModal, setShowModal] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null)

  //toDo revalidar
  const handleDeleteClick = (id: number) => {
    setCategoryToDelete(id)
    setShowModal(true)
  }

  //toDO revalidar
  const handleConfirmDelete = async () => {
    if (categoryToDelete !== null) {
      try {
        await api.deleteCategory(categoryToDelete)
        setShowModal(false)
        setCategoryToDelete(null)
        refetch()
      } catch (err) {
        console.error('Error deleting category:', err)
      }
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setCategoryToDelete(null)
  }

  return (
    <Container>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {categories &&
          <>
            <h1 className="mb-5">Coisas que gosto de fazer</h1>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Valor</th>
                  <th>Momentos</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
            {categories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center text-muted">
                    Nenhuma categoria encontrada
                  </td>
                </tr>
            ) : (
                categories.map((category) => (
                    <tr key={category.id}>
                      <td>{category.name}</td>
                      <td>{category.value}</td>
                      <td>{category.moments.map(m => m.name).join(', ')}</td>
                      <td style={{display: 'flex', gap: '16px'}}>
                        <Link to={"/edit/" + category.id}>
                          <Button variant='success'>Editar</Button>
                        </Link>
                        <Button variant='danger' onClick={() => handleDeleteClick(category.id)}>Excluir</Button>
                      </td>
                    </tr>
                ))
            )}
            </tbody>
          </Table>
          </>
      }
      <Link to='/add'>
        <Button variant="primary" >Adicionar categoria</Button>
      </Link>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir esta categoria?
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

export default CategoryPage
