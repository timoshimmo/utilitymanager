import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

interface EquipmentsState {
  id: string;
  name: string;
  quantity: number;
  status: number;
}

export const defaultEquipments: EquipmentsState = {
  id: "",
  name: "",
  quantity: 0,
  status: 0
};

export const equipmentsAtom = atomWithStorage("item_request", defaultEquipments);
export const clearEquipmentsAtom = atom(null, (_get, set, _data) => {
  return set(equipmentsAtom, defaultEquipments);
});

export const equipsAtom = atom([defaultEquipments]);

export const equipAtom = atom(
  (get) => get(equipmentsAtom),
  (get, set, data: any) => {
    const prev = get(equipmentsAtom);
    return set(equipmentsAtom, { ...prev, name: data });
  }
);

export const nameAtom = atom(
  (get) => get(equipmentsAtom).name,
  (get, set, data: string) => {
    const prev = get(equipmentsAtom);
    return set(equipmentsAtom, { ...prev, name: data });
  }
);

export const quantityAtom = atom(
  (get) => get(equipmentsAtom).quantity,
  (get, set, data: number) => {
    const prev = get(equipmentsAtom);
    return set(equipmentsAtom, { ...prev, quantity: data });
  }
);

export const statusAtom = atom(
  (get) => get(equipmentsAtom).status,
  (get, set, data: number) => {
    const prev = get(equipmentsAtom);
    return set(equipmentsAtom, { ...prev, status: data });
  }
);
