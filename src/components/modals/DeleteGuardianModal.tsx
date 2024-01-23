"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useMutateProcessor } from "@/hooks/useTanstackQuery";
import { GuardianSchemaType } from "@/schema/guardian";

const DeleteGurdianModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const isModalOpen = isOpen && type === "deleteGuardian";

  const deleteGuardian = useMutateProcessor<string, GuardianSchemaType>(
    `/guardians/${data.guardian?.id}`,
    null,
    "DELETE",
    ["guardians"]
  );

  const onCancel = () => {
    onClose();
  };

  const onConfirm = async () => {
    try {
      deleteGuardian.mutate(data.guardian?.id as string, {
        onSuccess() {
          toast.success(`Information has been deleted`);
          onClose();
        },
        onError() {
          toast.error(`Something went wrong...`);
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[95vh] max-w-[90vw] md:w-[550px] overflow-y-auto bg-white text-black p-0">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Guardian
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this?
            <br />
            This information will be permanently{" "}
            <span className="text-rose-500 font-semibold">deleted</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4 ">
          <div className="flex items-center justify-between w-full">
            <Button
              className=""
              disabled={deleteGuardian.isPending}
              onClick={onCancel}
              variant={"ghost"}
            >
              Cancel
            </Button>
            <Button
              className="text-white"
              disabled={deleteGuardian.isPending}
              onClick={onConfirm}
              variant={"default"}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteGurdianModal;
