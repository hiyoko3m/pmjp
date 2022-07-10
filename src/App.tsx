import React from "react";
import { Title, Explanation } from "./components/common";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import {
  AdDate,
  AdPartialDate,
  JpPartialDate,
  AdToJpDate,
  JpToAdDate,
} from "./utils/date";
import { AdJpDateForm } from "./components/date_form";

function App() {
  const [{ adDate, jpDate }, setAdAndJpDates] = React.useState<{
    adDate: AdPartialDate;
    jpDate: JpPartialDate;
  }>({
    adDate: {
      adYear: undefined,
      adMonth: undefined,
      adDay: undefined,
    },
    jpDate: {
      jpEra: "",
      jpYear: undefined,
      jpMonth: undefined,
      jpDay: undefined,
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSubmit");
  };

  const handleChangeDate = ({
    adArg: newAdDate = undefined,
    jpArg: newJpDate = undefined,
  }: {
    adArg?: AdPartialDate;
    jpArg?: JpPartialDate;
  }) => {
    if (newAdDate != undefined) {
      console.log("bbb");
      setAdAndJpDates({ adDate: newAdDate, jpDate: AdToJpDate(newAdDate) });
    }
    if (newJpDate != undefined) {
      console.log("aaa");
      setAdAndJpDates({ adDate: JpToAdDate(newJpDate), jpDate: newJpDate });
    }
  };

  return (
    <>
      <CssBaseline />
      <Title>歴代総理大臣</Title>
      <Explanation>
        {"「あの日の総理大臣って誰？」そんな疑問をすぐさま解決！"}
      </Explanation>
      <Container maxWidth={false}>
        <Stack
          component="form"
          onSubmit={handleSubmit}
          alignItems="center"
          mt={2}
          spacing={2}
        >
          <AdJpDateForm
            adDateValue={adDate}
            jpDateValue={jpDate}
            onChange={handleChangeDate}
          />
          <Button variant="contained" type="submit">
            総理大臣を表示
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export default App;
