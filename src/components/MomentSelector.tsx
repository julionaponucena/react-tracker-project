import { Controller } from 'react-hook-form';
import { useMoments } from '../hooks/useMoments';
import Select from 'react-select';
import { Form } from 'react-bootstrap';

interface MomentOption {
  value: number;
  label: string;
}

interface MomentSelectorProps {
  control: any;
  name: string;
  momentsIds:number[]
}

export default function MomentSelector({ control, name}: MomentSelectorProps) {
  const { moments, loading: momentsLoading } = useMoments();

  const momentOptions: MomentOption[] = moments.map((moment) => ({
    value: moment.id,
    label: moment.name
  }));

  const getSelectedMoments = (moments?: number[]): MomentOption[] => {
    if (!moments) return [];

    return momentOptions.filter((option) => moments.includes(option.value));
  };

  return (
    <Form.Group className="mb-3" controlId="formMoments">
      <Form.Label>Momentos</Form.Label>
      {momentsLoading ? (
        <Form.Text>Carregando momentos...</Form.Text>
      ) : moments.length === 0 ? (
        <Form.Text>Nenhum momento disponível</Form.Text>
      ) : (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              isMulti
              options={momentOptions}
              value={getSelectedMoments(field.value)}
              onChange={(selectedOptions) => {
                const options = selectedOptions ? selectedOptions.map((option) => option.value) : []
                field.onChange(options);
              }}
              placeholder="Selecione os momentos..."
              isClearable
              isSearchable
              noOptionsMessage={() => "Nenhum momento encontrado"}
            />
          )}
        />
      )}
    </Form.Group>
  );
}
