import React, { useState, useEffect } from 'react';
import cn from "classnames";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ProjectEquipmentsSelect from "./project-equipments-select";
import Input from './input';
import Alert from '../alert';
import Button from '../button';
import { useAtom } from 'jotai';
import { equipsAtom, equipmentsAtom } from "../../../contexts/equipments";
import {
  useModalAction,
  useModalState,
} from "../modal/modal.context";

type EquipValues = {
  equipments: any;
  quantity: number;
};

const equipmentSchema = yup.object().shape({
  equipments: yup.object().required('Equipments must be selected!'),
  quantity: yup.string().required("Quantity is required"),
});

const defaultValues = {
  equipments: [],
  quantity: 0
};

const AddEquipmentForm = () => {

    const [equipLoading, setEquipLoading] = useState(false);
    const { closeModal } = useModalAction();
    const { data } = useModalState();
    const [, setEquipmentAtom] = useAtom(equipmentsAtom);

    const [equipsList, setEquipsList] = useAtom(equipsAtom);



    const {
      register,
      handleSubmit,
      control,
      watch,
      formState: { errors },
    } = useForm<EquipValues>({
      defaultValues,
      resolver: yupResolver(equipmentSchema),
    });


    function addEquipment({ equipments, quantity }: EquipValues) {

        console.log("EQUIPMENTS:", JSON.stringify(equipments));
        const equipData = {
          id: equipments._id,
          name: equipments.type,
          quantity: quantity,
          status: 0
        }

        setEquipsList((equipsList) => [...equipsList, equipData]);
        closeModal();

    }

    return (
       <div className="p-8 bg-light w-96 m-auto max-w-lg rounded-md w-full">
          <form onSubmit={handleSubmit(addEquipment)} noValidate>
            <ProjectEquipmentsSelect
              control={control}
              error={(errors?.equipments as any)?.message}
              compulsory={true}
              data={data.data}
            />

            <Input
              label="Quantity"
              {...register('quantity')}
              type="text"
              variant="outline"
              compulsory={true}
              className="mb-5"
              placeholder="Enter quantity"
              error={errors.quantity?.message!}
            />

            <div className="flex items-center justify-between space-x-4 w-full mt-4">
              <div className="w-1/2">
                <Button
                  onClick={closeModal}
                  variant="custom"
                  className={cn(
                    "w-full py-2 px-4 bg-red-500 focus:outline-none hover:bg-red-700 focus:bg-red-700 text-light transition ease-in duration-200 text-center text-base font-semibold rounded shadow-md"
                  )}
                >
                  CANCEL
                </Button>
              </div>
              <div className="w-1/2">
                <Button
                  className="h-11 w-full"
                >
                  SAVE
                </Button>
              </div>
            </div>
          </form>
        </div>
    );
};

export default AddEquipmentForm;
