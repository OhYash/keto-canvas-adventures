import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { SECTION_ROUTES } from "./data/sections";

export const AppRoutes = () => (
  <Routes>
    {/* All registered section routes render Index canvas */}
    {SECTION_ROUTES.map((path) => (
      <Route key={path} path={path} element={<Index />} />
    ))}
    {/* Dynamic sub-routes */}
    <Route path="/travel/:storyId" element={<Index />} />
    <Route path="/writing/:slug" element={<Index />} />
    {/* Catch-all 404 route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
