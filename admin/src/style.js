
import { createTheme } from "@mui/material";

const GlobalTheme = createTheme({
    components: {
        MuiIconButton: {
          styleOverrides: {
            root: {
              fontSize: '5rem',
            //   backgroundColor: 'red !important', // will work with MUI v5's emotion/styled engine
            },
          },
        },
    },
});

export default GlobalTheme;