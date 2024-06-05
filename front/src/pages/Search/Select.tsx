import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Book, Category } from "../../type";

interface Props {
  searchResults: Book[];
  categories: Category[];
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    newValue: Category | null
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const Select: React.FC<Props> = ({
  onChange,
  onSubmit,
  searchResults,
  categories,
}) => {
  const options = categories;

  const [value, setValue] = React.useState<null | Category>(options[0] || null);
  const [inputValue, setInputValue] = React.useState("");

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue: Category | null) => {
          setValue(newValue);
          const syntheticEvent = {
            target: {
              name: "category_id",
              value: newValue ? newValue.id : "",
            },
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent, newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        getOptionLabel={(option) => option.title}
        sx={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="Категории" />}
      />
    </div>
  );
};

export default Select;
