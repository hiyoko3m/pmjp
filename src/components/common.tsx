import React from "react";
import Typography from "@mui/material/Typography";

type TitleProp = {
  children: React.ReactNode;
};

export function Title(props: TitleProp): JSX.Element {
  return <Typography variant="h2">{props.children}</Typography>;
}

type ExplanationProp = {
  children: React.ReactNode;
};

export function Explanation(props: ExplanationProp): JSX.Element {
  return <Typography>{props.children}</Typography>;
}
