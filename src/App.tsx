import React from "react";
import { Title, Explanation } from "./components/common";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function App() {
  const [adYear, setAdYear] = React.useState<string>("2001");
  const [adMonth, setAdMonth] = React.useState<string>("1");
  const [adDate, setAdDate] = React.useState<string>("31");

  const inputAdYear = React.useCallback(
    (_event: React.SyntheticEvent, value: string, _reason: string) => {
      setAdYear(value);
      console.log("inputAdYear");
    },
    [setAdYear]
  );

  const inputAdMonth = React.useCallback(
    (_event: React.SyntheticEvent, value: string, _reason: string) => {
      setAdMonth(value);
      setAdDate(value);
      console.log("inputAdMonth");
    },
    [setAdMonth]
  );

  const inputAdDate = React.useCallback(
    (_event: React.SyntheticEvent, value: string, _reason: string) => {
      setAdDate(value);
      console.log(`inputAdDate ${value} ${_reason}`);
    },
    [setAdDate]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAdMonth(adYear);
    console.log("handleSubmit");
  }

  return (
    <>
      <CssBaseline />
      <Title>
        歴代総理大臣
      </Title>
      <Explanation>
        {"「あの日の総理大臣って誰？」そんな疑問をすぐさま解決！"}
      </Explanation>
      <Container maxWidth={false}>
        <Stack component="form" onSubmit={handleSubmit} alignItems="center" mt={2} spacing={2}>
          <Stack direction="row" spacing={2}>
            <Autocomplete
              disablePortal
              freeSolo
              id="ad-year"
              options={options}
              renderInput={(params) => <TextField {...params} label="年" />}
              sx={{width: "110px"}}
              onInputChange={inputAdYear}
              inputValue={adYear}
            />
            <Autocomplete
              disablePortal
              freeSolo
              id="ad-month"
              options={options}
              renderInput={(params) => <TextField {...params} label="月" />}
              sx={{width: "80px"}}
              onInputChange={inputAdMonth}
              inputValue={adMonth}
            />
            <Autocomplete
              disablePortal
              freeSolo
              id="ad-date"
              options={options}
              renderInput={(params) => <TextField {...params} label="日" />}
              sx={{width: "80px"}}
              onInputChange={inputAdDate}
              inputValue={adDate}
            />
          </Stack>
          <FormControl>
            <RadioGroup
              row
              name="year-type-radio-buttons-group"
            >
              <FormControlLabel value="ad" control={<Radio size="small" />} label="西暦" />
              <FormControlLabel value="jp" control={<Radio size="small" />} label="和暦" />
            </RadioGroup>
          </FormControl>
          <Button variant="contained" type="submit">総理大臣を表示</Button>
        </Stack>
      </Container>
    </>
  );
}

const options = [
  { label: "1", adYear: "2001" },
  { label: "2", adYear: "2002" },
  { label: "3", adYear: "2003" },
];

export default App;
