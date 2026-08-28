import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import MomentSelector from './MomentSelector';

interface CategoryFormData {
  name: string;
  value: number;
  moments:{
      id: number;
      name: string;
  }[];
  momentIds: number[];
}

interface CategoryFormProps {
  initialData?: Partial<CategoryFormData>;
  onSubmit: (data: CategoryFormData) => void;
  submitLabel?: string;
}

export default function CategoryForm({ initialData, onSubmit, submitLabel = 'Enviar' }: CategoryFormProps) {
  const { register, handleSubmit, control, formState: { errors } } = useForm<CategoryFormData>({
    defaultValues: {
      name: initialData?.name || '',
      value: initialData?.value || 0,
      moments: initialData?.moments || [],
      momentIds: initialData?.moments?.map(m => m.id) || []

    }
  });

  const momentsIds = initialData?.moments?.map(m => m.id) || [];

  console.log(initialData)

  const onFormSubmit = (data: CategoryFormData) => {
      console.log(data)
    onSubmit(data);
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Nome</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Digite seu nome" 
          isInvalid={!!errors.name}
          {...register('name', { required: 'Nome é obrigatório' })}
        />
        {errors.name && <Form.Control.Feedback type="invalid">{errors.name.message}</Form.Control.Feedback>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formValue">
        <Form.Label>Valor</Form.Label>
        <Form.Control 
          type="number" 
          placeholder="Digite o valor" 
          isInvalid={!!errors.value}
          onKeyDown={(e) => {
            if (!/[0-9]/.test(e.key) && 
                !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) {
              e.preventDefault();
            }
          }}
          {...register('value', { 
            required: 'Valor é obrigatório',
            valueAsNumber: true,
            validate: (value) => {
              if (value < 1) return 'Valor deve ser no mínimo 1';
              if (!Number.isInteger(value)) return 'Valor deve ser um número inteiro';
              return true;
            }
          })}
        />
        {errors.value && <Form.Control.Feedback type="invalid">{errors.value.message}</Form.Control.Feedback>}
      </Form.Group>

      <MomentSelector momentsIds={momentsIds} control={control} name="momentIds" />

      <Button variant="primary" type="submit">
        {submitLabel}
      </Button>
    </Form>
  );
}
