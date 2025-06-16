import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Screen } from "./screens/Screen/Screen";
import { Services } from "./screens/Services/Services";
import { ServiceDetail } from "./screens/Services/ServiceDetail";
import { About } from "./screens/About/About";
import { Contacts } from "./screens/Contacts/Contacts";
import { Admin } from "./screens/Admin/Admin";
import { DatabaseProvider } from "./components/DatabaseProvider";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <DatabaseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Screen />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </DatabaseProvider>
  </StrictMode>,
);
