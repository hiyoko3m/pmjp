import React from "react";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

interface AdJpDate {
  adYear: number;
  adMonth: number;
  adDay: number;
}

interface AdJpPartialDate {
  adYear?: number;
  adMonth?: number;
  adDay?: number;
}

interface AdJpDateFormProps {
  adJpDateValue: AdJpPartialDate;
  onChange: (arg: AdJpPartialDate) => void;
  choiceBegin?: AdJpDate;
  choiceEnd?: AdJpDate;
}

/**
 * can choose which to show A.D. or Japanese calendar via selector
 */
export function AdJpDateForm(props: AdJpDateFormProps) {
  const { adYearShown, adMonthShown, adDayShown } = (() => {
    const convert = (num?: number) => {
      if (num) {
        return num.toString();
      } else {
        return undefined;
      }
    };
    return {
      adYearShown: convert(props.adJpDateValue.adYear),
      adMonthShown: convert(props.adJpDateValue.adMonth),
      adDayShown: convert(props.adJpDateValue.adDay),
    };
  })();

  const handleChangeYear = React.useCallback(
    (_event: React.SyntheticEvent, value: string, _reason: string) => {
      props.onChange({ ...props.adJpDateValue, adYear: parseInt(value) });
    },
    [props.adJpDateValue, props.onChange]
  );

  const handleChangeMonth = React.useCallback(
    (_event: React.SyntheticEvent, value: string, _reason: string) => {
      props.onChange({ ...props.adJpDateValue, adMonth: parseInt(value) });
    },
    [props.adJpDateValue, props.onChange]
  );

  const handleChangeDay = React.useCallback(
    (_event: React.SyntheticEvent, value: string, _reason: string) => {
      props.onChange({ ...props.adJpDateValue, adDay: parseInt(value) });
    },
    [props.adJpDateValue, props.onChange]
  );

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Autocomplete
          disablePortal
          freeSolo
          id="ad-year"
          options={["2000"]}
          renderInput={(params) => <TextField {...params} label="年" />}
          sx={{ width: "110px" }}
          onInputChange={handleChangeYear}
          inputValue={adYearShown}
        />
        <Autocomplete
          disablePortal
          freeSolo
          id="ad-month"
          options={["1"]}
          renderInput={(params) => <TextField {...params} label="月" />}
          sx={{ width: "80px" }}
          onInputChange={handleChangeMonth}
          inputValue={adMonthShown}
        />
        <Autocomplete
          disablePortal
          freeSolo
          id="ad-day"
          options={["1"]}
          renderInput={(params) => <TextField {...params} label="日" />}
          sx={{ width: "80px" }}
          onInputChange={handleChangeDay}
          inputValue={adDayShown}
        />
      </Stack>
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

export type { AdJpDate, AdJpPartialDate, AdJpDateFormProps };
