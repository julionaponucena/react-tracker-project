import Select from 'react-select';
import {useState} from "react";

interface OptionType {
  value: string;
  label: string;
}

const options: OptionType[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];




export default function TestSelect() {
  const [value,setValue] = useState<OptionType[] | null>([options[0]])

  return (
    <Select
      options={options}
      placeholder="Selecione uma opção..."
      isClearable
      isMulti
      isSearchable
      value={value}
      onChange={(selectedOption) => setValue(selectedOption as OptionType[] | null)}
    />
  );
}
