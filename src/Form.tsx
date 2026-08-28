import { Form, Button } from 'react-bootstrap';

export default function FormPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted');
    };

    return (
        <div className="container mt-4">
            <h1>Formulário</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="Digite seu nome" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Digite seu email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Digite sua senha" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSelect">
                    <Form.Label>Selecione uma opção</Form.Label>
                    <Form.Select>
                        <option>Opção 1</option>
                        <option>Opção 2</option>
                        <option>Opção 3</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCheckbox">
                    <Form.Check type="checkbox" label="Concordo com os termos" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTextarea">
                    <Form.Label>Mensagem</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Digite sua mensagem" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Enviar
                </Button>
            </Form>
        </div>
    );
}
