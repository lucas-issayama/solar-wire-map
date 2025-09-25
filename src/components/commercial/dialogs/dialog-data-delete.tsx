import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import corsolarApi from "@/utils/corsolar/corsolarApi";
import useSession from "@/components/session/use-session";

interface DialogDataDeleteProps {
  open: boolean;
  setOpen: any;
  schema: any;
  item: any;
  setRefreshParentCallKey: any;
}

export default function DialogDataDelete({
  open,
  setOpen,
  schema,
  item,

  setRefreshParentCallKey,
}: DialogDataDeleteProps) {
  const { session, isLoading, logout } = useSession();
  async function remove() {
    if (item?.id) {
      let ans: any = await corsolarApi.graphql.delete(
        session?.token,
        schema,
        item
      );
    }
    setOpen(false);
    if (setRefreshParentCallKey)
      setRefreshParentCallKey((prev: any) => prev + 1);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[500px] max-w-[80%] max-h-[90%] overflow-scroll  ">
        <DialogHeader>
          <DialogTitle className="">Delete</DialogTitle>
        </DialogHeader>
        <Card className="p-10">
          <h1 className="text-2xl font-extrabold my-10">{schema?.label}</h1>
          <p> Tem certeza que deseja excluir?</p>
          <div className="flex items-stretch justify-between my-10">
            <Button className="bg-red-500" onClick={remove}>
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
