import { Controller } from 'react-hook-form';
import { useBands } from '../hooks/useBands';
import Select from 'react-select';
import { Form } from 'react-bootstrap';

interface BandOption {
  value: number;
  label: string;
}

interface BandSelectorProps {
  control: any;
  name: string;
  bandId?: number;
}

export default function BandSelector({ control, name }: BandSelectorProps) {
  const { bands, loading: bandsLoading } = useBands();

  const bandOptions: BandOption[] = bands.map((band) => ({
    value: band.id,
    label: band.name
  }));

  const getSelectedBand = (bandId?: number): BandOption | null => {
    if (!bandId) return null;
    return bandOptions.find((option) => option.value === bandId) || null;
  };

  return (
    <Form.Group className="mb-3" controlId="formBand">
      <Form.Label>Banda</Form.Label>
      {bandsLoading ? (
        <Form.Text>Carregando bandas...</Form.Text>
      ) : bands.length === 0 ? (
        <Form.Text>Nenhuma banda disponível</Form.Text>
      ) : (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              options={bandOptions}
              value={getSelectedBand(field.value?.id)}
              onChange={(selectedOption) => {
                field.onChange(selectedOption ? { id: selectedOption.value, name: selectedOption.label } : null);
              }}
              placeholder="Selecione a banda..."
              isClearable
              isSearchable
              noOptionsMessage={() => "Nenhuma banda encontrada"}
            />
          )}
        />
      )}
    </Form.Group>
  );
}
