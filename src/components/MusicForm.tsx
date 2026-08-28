import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
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
  onSubmit: (data: MusicFormData) => void;
  submitLabel?: string;
}

export default function MusicForm({ initialData, onSubmit, submitLabel = 'Enviar' }: MusicFormProps) {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<MusicFormData>({
    defaultValues: {
      name: initialData?.name || '',
      band: initialData?.band || undefined,
      momentIds: initialData?.momentIds || [],
      musicTemperature: initialData?.musicTemperature || undefined
    }
  });


  // useEffect(() => {
  //   if (initialData) {
  //     reset({
  //       name: initialData.name || '',
  //       band: initialData.band || undefined,
  //       momentIds: initialData.momentIds || [],
  //       musicTemperatureId: initialData.musicTemperatureId || undefined
  //     });
  //   }
  // }, [initialData, reset]);

  const bandId = initialData?.band?.id;
  const momentsIds = initialData?.momentIds || [];
  // const musicTemperatureId = initialData?.musicTemperatureId;

  const onFormSubmit = (data: MusicFormData) => {
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

      <BandSelector bandId={bandId} control={control} name="band" />

      <MomentSelector control={control} name="momentIds" momentsIds={momentsIds} />

      <MusicTemperatureSelector  control={control} name="musicTemperature" />

      <Button variant="primary" type="submit">
        {submitLabel}
      </Button>
    </Form>
  );
}
