import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import corsolarApi from "@/utils/corsolar/corsolarApi";

interface DialogConfirmDeleteProps {
  open: boolean;
  setOpen: any;

  confirmDelete: any;
}

export default function DialogConfirmDelete({
  open,
  setOpen,
  confirmDelete,
}: DialogConfirmDeleteProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[500px] max-w-[80%] max-h-[90%] overflow-scroll  ">
        <DialogHeader>
          <DialogTitle className="">Delete</DialogTitle>
        </DialogHeader>
        <Card className="p-10">
          <p> Tem certeza que deseja excluir?</p>
          <div className="flex items-stretch justify-between my-10">
            <Button className="bg-red-500" onClick={confirmDelete}>
              Sim
            </Button>

            <Button className="" onClick={(el) => setOpen(false)}>
              Não
            </Button>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
