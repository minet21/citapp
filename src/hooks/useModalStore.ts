import { GetCurrentUserType } from "@/actions/getCurrentUser";
import { GuardianSchemaType } from "@/schema/guardian";
import { PostSchemaType } from "@/schema/post";
import {
  UserProfileWithDepartmentSection,
  UserWithProfile,
} from "@/types/types";
import { create } from "zustand";

export type ModalType =
  | "importStudents"
  | "archiveUser"
  | "createEvent"
  | "viewEvent"
  | "createDiscussion"
  | "createGuardian"
  | "updateGuardian"
  | "deleteGuardian"
  | "deletePost";

// you can extend this type if you have more modal

// export type ModalType = "..." | "...." | "...."

type ModalData = {
  user?:
    | UserWithProfile
    | UserProfileWithDepartmentSection
    | GetCurrentUserType;
  calendarApi?: any;
  guardian?: GuardianSchemaType;
  post?: PostSchemaType;
};

type ModalStore = {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
};

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onClose: () => set({ type: null, isOpen: false }),
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
}));
