import { useState } from "react";
import Header from "@/components/Header";
import NameEntry from "@/components/NameEntry";
import StatsCards from "@/components/StatsCards";
import MemberSearch from "@/components/MemberSearch";
import AddMemberForm from "@/components/AddMemberForm";
import CsvImport from "@/components/CsvImport";
import ExcelExport from "@/components/ExcelExport";

const OPERATOR_KEY = "texibition_operator";

const Index = () => {
  const [operator, setOperator] = useState<string | null>(() => {
    return localStorage.getItem(OPERATOR_KEY);
  });

  const handleNameSubmit = (name: string) => {
    localStorage.setItem(OPERATOR_KEY, name);
    setOperator(name);
  };

  const handleLogout = () => {
    localStorage.removeItem(OPERATOR_KEY);
    setOperator(null);
  };

  if (!operator) return <NameEntry onNameSubmit={handleNameSubmit} />;

  return (
    <div className="min-h-screen bg-background">
      <Header operatorName={operator} onLogout={handleLogout} />
      <main className="container max-w-2xl py-4 space-y-4 px-4">
        <StatsCards />
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-lg text-foreground uppercase tracking-wide">MEMBERS</h2>
          <div className="flex gap-2">
            <CsvImport />
            <ExcelExport />
            <AddMemberForm />
          </div>
        </div>
        <MemberSearch operatorName={operator} />
      </main>
    </div>
  );
};

export default Index;
