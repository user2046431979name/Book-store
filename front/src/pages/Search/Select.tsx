import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Book, Category, BookSearchParams } from "../../type";

interface Props {
  categories: Category[];
  onChange: (
    title: string
  ) => void;
}

const Select: React.FC<Props> = ({
  onChange,
  categories: options,
}) => {
  const [value, setValue] = React.useState<null | Category>(options[0] || null);
  const [inputValue, setInputValue] = React.useState("");

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          onChange(newInputValue);
        }}
        options={options}
        getOptionLabel={(option) => option.title}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        sx={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="Категории" />}
      />
    </div>
  );
};

export default Select;
