import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import BandSelector from './BandSelector';
import MomentSelector from './MomentSelector';
import MusicTemperatureSelector from './MusicTemperatureSelector';

interface MusicFormData {
  name: string;
  band: {
    id: number;
    name: string;
  };
  momentIds: number[];
  musicTemperature?: number;
}

interface MusicFormProps {
  initialData?: Partial<MusicFormData>;
  onSubmit: (data: MusicFormData) => void | Promise<void>;
  submitLabel?: string;
}

export default function MusicForm({ initialData, onSubmit, submitLabel = 'Enviar' }: MusicFormProps) {
  const { register, handleSubmit, control, setError, formState: { errors } } = useForm<MusicFormData>({
    defaultValues: {
      name: initialData?.name || '',
      band: initialData?.band || undefined,
      momentIds: initialData?.momentIds || [],
      musicTemperature: initialData?.musicTemperature || undefined
    }
  });

  const onFormSubmit = (data: MusicFormData) => {
    if (!data.band) {
      setError('band', { type: 'manual', message: 'Banda é obrigatória' });
      return;
    }
    onSubmit(data);
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Nome</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Digite o nome da música" 
          isInvalid={!!errors.name}
          {...register('name', { required: 'Nome é obrigatório' })}
        />
        {errors.name && <Form.Control.Feedback type="invalid">{errors.name.message}</Form.Control.Feedback>}
      </Form.Group>

      <BandSelector bandId={initialData?.band?.id} control={control} name="band" />
      {errors.band && <Form.Text className="text-danger">{errors.band.message}</Form.Text>}

      <MomentSelector control={control} name="momentIds" momentsIds={initialData?.momentIds || []} />

      <MusicTemperatureSelector  control={control} name="musicTemperature" musicTemperatureId={initialData?.musicTemperature} />

      <Button variant="primary" type="submit">
        {submitLabel}
      </Button>
    </Form>
  );
}
