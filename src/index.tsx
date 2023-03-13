import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { PersistGate } from "redux-persist/integration/react";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading="loading..." persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
