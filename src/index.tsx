import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.less";
import MovieAppProvider from "./context/movie-app-context/movie-app-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MovieAppProvider>
      <App />
    </MovieAppProvider>
  </React.StrictMode>
);
