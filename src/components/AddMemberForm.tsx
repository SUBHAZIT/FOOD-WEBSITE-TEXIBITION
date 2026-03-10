import { useState } from "react";
import { useAddMember } from "@/hooks/useMembers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";

const AddMemberForm = () => {
  const addMember = useAddMember();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addMember.mutate(
      { name: name.trim() },
      {
        onSuccess: () => {
          toast.success(`${name.trim().toUpperCase()} ADDED`);
          setName("");
          setOpen(false);
        },
        onError: () => toast.error("FAILED TO ADD MEMBER"),
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gradient-primary text-primary-foreground uppercase text-xs font-heading">
          <UserPlus className="w-4 h-4 mr-1" />
          ADD
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-heading uppercase">ADD MEMBER</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs uppercase">NAME</Label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="MEMBER NAME" className="uppercase" required />
          </div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground uppercase font-heading" disabled={addMember.isPending}>
            ADD MEMBER
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberForm;
