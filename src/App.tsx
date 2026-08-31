import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
const Index = React.lazy(() => import("./pages/Index.tsx"));
const NotFound = React.lazy(() => import("./pages/NotFound.tsx"));
const Stock = React.lazy(() => import("./pages/Stock.tsx"));
const Stock2 = React.lazy(() => import("./pages/Stock2.tsx"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy.tsx"));
const AiRegulation = React.lazy(() => import("./pages/AiRegulation.tsx"));
const PersonalDataConsent = React.lazy(() => import("./pages/PersonalDataConsent.tsx"));
const CookiePolicy = React.lazy(() => import("./pages/CookiePolicy.tsx"));



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/stock2" element={<Stock2 />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/ai-regulation" element={<AiRegulation />} />
            <Route path="/consent" element={<PersonalDataConsent />} />
            <Route path="/cookies" element={<CookiePolicy />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
