import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFoundPage/NotFoundPage";
import FormBuilderPage from "./pages/FormBuilderPage/FormBuilderPage";
import { Toaster } from "react-hot-toast";
import FormFillerPage from "./pages/FormFillerPage/FormFillerPage";
import Homepage from "./pages/HomePage/HomePage";
import FormResponsesPage from "./pages/FormResponsesPage/FormResponsesPage";

const App: React.FC = () => {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="forms/new" element={<FormBuilderPage />} />
          <Route path="forms/:id/fill" element={<FormFillerPage />} />
          <Route path="forms/:id/responses" element={<FormResponsesPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
