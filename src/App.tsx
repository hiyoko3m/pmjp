import React from "react";
import { Title, Explanation } from "./components/common";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import {
  AdDate,
  AdPartialDate,
  AdJpDateFormProps,
  AdJpDateForm,
} from "./components/date_form";

function App() {
  const [adDate, setAdDate] = React.useState<AdPartialDate>({
    adYear: undefined,
    adMonth: undefined,
    adDay: undefined,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSubmit");
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
            onChange={(newDate) => setAdDate(newDate)}
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
