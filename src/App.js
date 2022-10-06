import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import { GlobalStyles } from "./components/Styles"
import { publicRoutes } from "./routes";
import { theme } from "./utils/theme"

export default function App() {
  return (
    <div>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;

              return (
                <Route
                  key={index}
                  path={route.path}
                  exact
                  element={<Page />}
                ></Route>
              )
            })}
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}
