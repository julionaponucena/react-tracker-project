import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

interface BandFormData {
  name: string;
}

interface BandFormProps {
  initialData?: Partial<BandFormData>;
  onSubmit: (data: BandFormData) => void;
  submitLabel?: string;
}

export default function BandForm({ initialData, onSubmit, submitLabel = 'Enviar' }: BandFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<BandFormData>({
    defaultValues: initialData || {
      name: ''
    }
  });

  const onFormSubmit = (data: BandFormData) => {
    onSubmit(data);
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Nome</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Digite o nome da banda" 
          isInvalid={!!errors.name}
          {...register('name', { required: 'Nome é obrigatório' })}
        />
        {errors.name && <Form.Control.Feedback type="invalid">{errors.name.message}</Form.Control.Feedback>}
      </Form.Group>

      <Button variant="primary" type="submit">
        {submitLabel}
      </Button>
    </Form>
  );
}
