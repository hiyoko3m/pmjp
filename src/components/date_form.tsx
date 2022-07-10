import React from "react";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import {
  lastYear,
  lastMonth,
  lastDay,
  firstYearPmJpExists,
  firstMonthPmJpExists,
  firstDayPmJpExists,
  AdToJpDate,
  AdDate,
  AdPartialDate,
  JpDate,
  JpPartialDate,
} from "../utils/date";
import { range } from "../utils/range";

interface AdJpDateFormProps {
  adDateValue: AdPartialDate;
  onChange: (arg: AdPartialDate) => void;
  choicableRangeBegin?: AdDate;
  choicableRangeEnd?: AdDate;
}

/**
 * can choose which to show A.D. or Japanese calendar via selector
 */
export function AdJpDateForm(props: AdJpDateFormProps) {
  const adDateCallback = React.useCallback(
    function (adDate: AdPartialDate) {
      props.onChange(adDate);
    },
    [props.adDateValue]
  );

  const jpDateValue = AdToJpDate(props.adDateValue);

  return (
    <>
      <AdDateInput adDateValue={props.adDateValue} onChange={adDateCallback} />
      <JpDateInput
        jpDateValue={jpDateValue}
        onChange={(arg) => {
          console.log(arg);
        }}
      />
      <FormControl>
        <RadioGroup row name="year-type-radio-buttons-group">
          <FormControlLabel
            value="ad"
            control={<Radio size="small" />}
            label="西暦"
          />
          <FormControlLabel
            value="jp"
            control={<Radio size="small" />}
            label="和暦"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
}

const converter = (num?: number) => {
  if (num) {
    return num.toString();
  } else {
    return "";
  }
};

interface AdDateInputProps {
  adDateValue: AdPartialDate;
  onChange: (arg: AdPartialDate) => void;
}

function AdDateInput(props: AdDateInputProps) {
  const handleChangeYear = React.useCallback(
    (_event: React.SyntheticEvent, value: string, _reason: string) => {
      props.onChange({ ...props.adDateValue, adYear: parseInt(value) });
    },
    [props.adDateValue]
  );

  const handleChangeMonth = React.useCallback(
    (_event: React.SyntheticEvent, value: string, _reason: string) => {
      props.onChange({ ...props.adDateValue, adMonth: parseInt(value) });
    },
    [props.adDateValue]
  );

  const handleChangeDay = React.useCallback(
    (_event: React.SyntheticEvent, value: string, _reason: string) => {
      props.onChange({ ...props.adDateValue, adDay: parseInt(value) });
    },
    [props.adDateValue]
  );

  return (
    <Stack direction="row" spacing={2}>
      <Autocomplete
        disablePortal
        id="ad-year"
        options={range(firstYearPmJpExists(), lastYear() + 1).map((v) =>
          v.toString()
        )}
        renderInput={(params) => <TextField {...params} label="年" />}
        sx={{ width: "130px" }}
        onInputChange={handleChangeYear}
        inputValue={converter(props.adDateValue.adYear)}
      />
      <Autocomplete
        disablePortal
        id="ad-month"
        options={range(
          firstMonthPmJpExists(props.adDateValue.adYear),
          lastMonth(props.adDateValue.adYear) + 1
        ).map((v) => v.toString())}
        renderInput={(params) => <TextField {...params} label="月" />}
        sx={{ width: "100px" }}
        onInputChange={handleChangeMonth}
        inputValue={converter(props.adDateValue.adMonth)}
      />
      <Autocomplete
        disablePortal
        id="ad-day"
        options={range(
          firstDayPmJpExists(
            props.adDateValue.adYear,
            props.adDateValue.adMonth
          ),
          lastDay(props.adDateValue.adYear, props.adDateValue.adMonth) + 1
        ).map((v) => v.toString())}
        renderInput={(params) => <TextField {...params} label="日" />}
        sx={{ width: "100px" }}
        onInputChange={handleChangeDay}
        inputValue={converter(props.adDateValue.adDay)}
      />
    </Stack>
  );
}

interface JpDateInputProps {
  jpDateValue: JpPartialDate;
  onChange: (arg: JpPartialDate) => void;
}

function JpDateInput(props: JpDateInputProps) {
  const handleChangeYear = React.useCallback(
    (_event: React.SyntheticEvent, value: string, _reason: string) => {
      props.onChange({ ...props.jpDateValue, jpYear: parseInt(value) });
    },
    [props.jpDateValue]
  );

  const handleChangeMonth = React.useCallback(
    (_event: React.SyntheticEvent, value: string, _reason: string) => {
      props.onChange({ ...props.jpDateValue, jpMonth: parseInt(value) });
    },
    [props.jpDateValue]
  );

  const handleChangeDay = React.useCallback(
    (_event: React.SyntheticEvent, value: string, _reason: string) => {
      props.onChange({ ...props.jpDateValue, jpDay: parseInt(value) });
    },
    [props.jpDateValue]
  );

  return (
    <Stack direction="row" spacing={2}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="jp-era-label">年号</InputLabel>
        <Select labelId="jp-era-label" id="jp-era" value={"令和"} label="年号">
          <MenuItem value={"令和"}>aiueo</MenuItem>
        </Select>
      </FormControl>
      <Autocomplete
        disablePortal
        freeSolo
        id="jp-year"
        options={["2000"]}
        renderInput={(params) => <TextField {...params} label="年" />}
        sx={{ width: "110px" }}
        onInputChange={handleChangeYear}
        inputValue={converter(props.jpDateValue.jpYear)}
      />
      <Autocomplete
        disablePortal
        freeSolo
        id="jp-month"
        options={["1"]}
        renderInput={(params) => <TextField {...params} label="月" />}
        sx={{ width: "80px" }}
        onInputChange={handleChangeMonth}
        inputValue={converter(props.jpDateValue.jpMonth)}
      />
      <Autocomplete
        disablePortal
        freeSolo
        id="jp-day"
        options={["1"]}
        renderInput={(params) => <TextField {...params} label="日" />}
        sx={{ width: "80px" }}
        onInputChange={handleChangeDay}
        inputValue={converter(props.jpDateValue.jpDay)}
      />
    </Stack>
  );
}

export type { AdDate, AdPartialDate, AdJpDateFormProps };
