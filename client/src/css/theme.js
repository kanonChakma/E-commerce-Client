import { blue, pink } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
export const appTheme = createTheme({
  palette: {
    primary: blue,
    secondary: pink,
    anger: createColor('#F40B27'),
    apple: createColor('#5DBA40'),
    steelBlue: createColor('#5C76B7'),
    violet: createColor('#616161'),
  },
});