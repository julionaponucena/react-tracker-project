import { Controller } from 'react-hook-form';
import { useMusicTemperatures } from '../hooks/useMusicTemperatures';
import Select from 'react-select';
import { Form } from 'react-bootstrap';

interface MusicTemperatureOption {
  value: number;
  label: string;
}

interface MusicTemperatureSelectorProps {
  control: any;
  name: string;
  musicTemperatureId?: number;
}

export default function MusicTemperatureSelector({ control, name, musicTemperatureId }: MusicTemperatureSelectorProps) {
  const { musicTemperatures, loading: musicTemperaturesLoading } = useMusicTemperatures();

  const musicTemperatureOptions: MusicTemperatureOption[] = musicTemperatures.map((musicTemperature) => ({
    value: musicTemperature.id,
    label: musicTemperature.name
  }));

  const getSelectedMusicTemperature = (musicTemperatureId?: number): MusicTemperatureOption | null => {
    console.log('getSelectedMusicTemperature',musicTemperatureOptions);
    if (!musicTemperatureId) return null;
    console.log(musicTemperatureId);
    return musicTemperatureOptions.find((option) => option.value === musicTemperatureId) || null;
  };

  return (
    <Form.Group className="mb-3" controlId="formMusicTemperature">
      <Form.Label>Temperatura Musical</Form.Label>
      {musicTemperaturesLoading ? (
        <Form.Text>Carregando temperaturas musicais...</Form.Text>
      ) : musicTemperatures.length === 0 ? (
        <Form.Text>Nenhuma temperatura musical disponível</Form.Text>
      ) : (
        <Controller
          name={name}
          control={control}
          defaultValue={musicTemperatureId}
          render={({ field }) => (
            <Select
              options={musicTemperatureOptions}
              value={getSelectedMusicTemperature(field.value)}
              onChange={(selectedOption) => {
                field.onChange(selectedOption ? selectedOption.value : null);
              }}
              placeholder="Selecione a temperatura musical..."
              isClearable
              isSearchable
              noOptionsMessage={() => "Nenhuma temperatura musical encontrada"}
            />
          )}
        />
      )}
    </Form.Group>
  );
}
