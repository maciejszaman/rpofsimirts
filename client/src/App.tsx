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
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  //0 = Card-type view for images;
  //1 = File list

  const [viewerType, setViewerType] = useState(false);
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
