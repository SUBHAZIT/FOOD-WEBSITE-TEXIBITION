import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import texibitionLogo from "@/assets/texibition-logo.png";
import { User } from "lucide-react";

interface NameEntryProps {
  onNameSubmit: (name: string) => void;
}

const NameEntry = ({ onNameSubmit }: NameEntryProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) onNameSubmit(name.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero px-4">
      <Card className="w-full max-w-sm animate-fade-in shadow-2xl border-0">
        <CardHeader className="text-center pb-2">
          <img src={texibitionLogo} alt="TEXIBITION 2K26" className="h-16 mx-auto mb-3" />
          <CardTitle className="text-lg font-heading uppercase tracking-wide text-foreground">
            FOOD ATTENDANCE SYSTEM
          </CardTitle>
          <p className="text-sm text-muted-foreground uppercase">ENTER YOUR NAME TO CONTINUE</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="YOUR NAME"
                className="pl-10 uppercase"
                required
              />
            </div>
            <Button type="submit" className="w-full gradient-primary text-primary-foreground uppercase font-heading tracking-wider">
              ENTER SYSTEM
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NameEntry;
