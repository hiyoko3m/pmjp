import React from "react";
import { Title, Explanation } from "./components/common";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
      <Title>
        歴代総理大臣
      </Title>
      <Explanation>
        {"「あの日の総理大臣って誰？」そんな疑問をすぐさま解決！"}
      </Explanation>
      <Stack component="form" onSubmit={handleSubmit}>
        <Autocomplete
          disablePortal
          freeSolo
          id="ad-year"
          options={options}
          renderInput={(params) => <TextField {...params} label="年" />}
          onInputChange={inputAdYear}
          inputValue={adYear}
        />
        <Autocomplete
          disablePortal
          freeSolo
          id="ad-month"
          options={options}
          renderInput={(params) => <TextField {...params} label="月" />}
          onInputChange={inputAdMonth}
          inputValue={adMonth}
        />
        <Autocomplete
          disablePortal
          freeSolo
          id="ad-date"
          options={options}
          renderInput={(params) => <TextField {...params} label="日" />}
          onInputChange={inputAdDate}
          inputValue={adDate}
        />
        <Button variant="outlined" type="submit">総理大臣を表示</Button>
      </Stack>
    </>
  );
}

const options = [
  { label: "1", adYear: "2001" },
  { label: "2", adYear: "2002" },
  { label: "3", adYear: "2003" },
];

export default App;
