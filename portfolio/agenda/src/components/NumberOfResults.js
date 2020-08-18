import React, { useContext } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import { SearchContext } from "./context/searchContext";

export const NumberOfResults = () => {
  const { value, setValue } = useContext(SearchContext);
  //   const [value, setValue] = useState("10");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      {/* <FormLabel component="legend">Gender</FormLabel> */}
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={value}
        onChange={handleChange}
      >
        <Grid container>
          <Grid item sm>
            <FormControlLabel value="10" control={<Radio />} label="10" />
          </Grid>
          <Grid item sm>
            <FormControlLabel value="130" control={<Radio />} label="130" />
          </Grid>
        </Grid>
      </RadioGroup>
    </FormControl>
  );
};
