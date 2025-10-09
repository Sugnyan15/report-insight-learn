import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Analytics from "./pages/Analytics";
import DigitalEvaluation from "./pages/DigitalEvaluation";
import Students from "./pages/Students";
import Reports from "./pages/Reports";
import Calendar from "./pages/Calendar";
import Messages from "./pages/Messages";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import CourseCreate from "./pages/CourseCreate";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen bg-background">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/evaluation" element={<DigitalEvaluation />} />
                <Route path="/students" element={<Students />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/users" element={<Users />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/courses/create" element={<CourseCreate />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
