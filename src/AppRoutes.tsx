import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/personal" element={<Index />} />
    <Route path="/work" element={<Index />} />
    <Route path="/keto" element={<Index />} />
    <Route path="/hobbies" element={<Index />} />
    <Route path="/projects" element={<Index />} />
    <Route path="/now" element={<Index />} />
    <Route path="/contact" element={<Index />} />
    <Route path="/travel" element={<Index />} />
    <Route path="/travel/:storyId" element={<Index />} />
    <Route path="/ataco" element={<Index />} />
    <Route path="/writing" element={<Index />} />
    <Route path="/writing/:slug" element={<Index />} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
