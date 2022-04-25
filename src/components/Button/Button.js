import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { teal, orange } from "@mui/material/colors";
import { Link } from "react-router-dom";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(teal[500]),
  backgroundColor: teal[500],
  "&:hover": {
    backgroundColor: orange[500],
  },
}));

export const CustomizedButton = () => {
  const styleBtn = {
    position: "fixed",
  };
  return (
    <Stack spacing={2} direction="row" style={styleBtn}>
      <Link to={`posts/create`}>
        <ColorButton variant="contained">Есть что сказать?</ColorButton>
      </Link>
    </Stack>
  );
};
