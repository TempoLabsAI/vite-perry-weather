import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import { PWThemeProvider, ThemeType } from "@/perry-weather";

function App() {
  return (
    <PWThemeProvider defaultTheme={ThemeType.LIGHT}>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </PWThemeProvider>
  );
}

export default App;
