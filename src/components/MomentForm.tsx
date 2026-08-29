import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

interface MomentFormData {
  name: string;
}

interface MomentFormProps {
  initialData?: Partial<MomentFormData>;
  onSubmit: (data: MomentFormData) => void;
  submitLabel?: string;
}

export default function MomentForm({ initialData, onSubmit, submitLabel = 'Enviar' }: MomentFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<MomentFormData>({
    defaultValues: initialData || {
      name: ''
    }
  });

  const onFormSubmit = (data: MomentFormData) => {
    onSubmit(data);
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Nome</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Digite o nome do momento" 
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
