import useSession from "@/components/session/use-session";
import { City } from "@/types/city";
import corsolarApi from "@/utils/corsolar/corsolarApi";
import {
  Autocomplete,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

type FieldInputCityProps = {
  field: City | null | undefined;
  setField: any;
};

export default function FieldInputCity({
  field,
  setField,
}: FieldInputCityProps) {
  const { session, isLoading } = useSession();
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState<City | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCitiesByName = useCallback(async (name: string) => {
    setLoading(true);
    try {
      const data = await corsolarApi.cities.getCitiesByName(
        session?.token,
        name
      );
      console.log(JSON.stringify({ cities: data }));
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (field) {
      //fetchCitiesByName(field.name);
      fetchCitiesByName(`${field.name} - ${field.stateShortName}`);
      setSelectedValue(field);
    }

    if (inputValue.trim().length > 0) {
      fetchCitiesByName(inputValue);
    } else {
      setCities([]);
    }
  }, [field, inputValue, fetchCitiesByName]);

  return (
    <>
      {/* <p>{JSON.stringify(selectedValue)}</p> */}
      <Autocomplete
        value={selectedValue}
        isOptionEqualToValue={(option, value) =>
          option.fullName == value.fullName
        }
        onChange={(event, newValue) => {
          setSelectedValue(newValue);
          setField(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={cities}
        getOptionLabel={(option: any) => option.fullName}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </>
  );
}
