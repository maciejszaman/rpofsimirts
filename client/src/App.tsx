import React, { useState } from "react";
import "./App.css";
import { Navigation } from "./components/Navigation/Navigation";
import { Viewer } from "./components/Viewer/Viewer";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";

function App() {
  const systemDefault = useMediaQuery("(prefers-color-scheme: dark)");

  const [darkMode, setDarkMode] = useState(systemDefault);

  const darkTheme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: "#6b6b6b #2b2b2b",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              backgroundColor: "#2b2b2b",
              width: 16,
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              backgroundColor: "#6b6b6b",
              minHeight: 12,
              border: "3px solid #2b2b2b",
            },
            "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
              {
                backgroundColor: "#959595",
              },
            "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
              {
                backgroundColor: "#959595",
              },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
              {
                backgroundColor: "#959595",
              },
            "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
              backgroundColor: "#2b2b2b",
            },
          },
        },
      },
    },
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  //0 = Card-type view for images;
  //1 = File list

  const [viewerType, setViewerType] = useState(true);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline>
          <Navigation
            viewerType={viewerType}
            setViewerType={setViewerType}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
          <Viewer viewerType={viewerType} />
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;
