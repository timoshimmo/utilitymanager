import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory, useLocation } from 'react-router-dom';
import Alert from '../../components/ui/alert';
import Card from "../../components/ui/cards/card";
import Input from '../../components/ui/forms/input';
import FileInput from "../../components/ui/forms/file-input";
import Select from 'react-select';
import Button from '../../components/ui/button';
import { BackArrowIcon } from '../../components/icons/back-arrow';
import AssetTypeSelect from "../../components/ui/forms/asset-type-select";
import AssetParentSelect from "../../components/ui/forms/asset-parent-select";
import AssetStatusSelect from "../../components/ui/forms/asset-status-select";
import CriticalRepairsSelect from "../../components/ui/forms/critical-repairs-select";
import AdequatelySecuredSelect from "../../components/ui/forms/adequately-secured-select";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
//import axios from 'axios';
import SERVICES from '../../util/webservices';

type FormValues = {
  assetType: any;
  assetParent: any;
  description: string;
  brand: string;
  installationYear: string;
  purchaseYear: string;
  designLoad: string;
  actualLoad: string;
  status: any;
  criticalRepairs: any;
  secured: any;
  location: string;
  value: string;
  attachment: any;
}

const superadminSchema = yup.object().shape({
  assetType: yup.object().required('Asset type must be selected'),
  assetParent: yup.object().nullable(),
  description: yup
    .string()
    .required('description is required'),
  brand: yup
    .string()
    .required('brand is required'),
  installationYear: yup
    .string()
    .required('installation year is required'),
  purchaseYear: yup
    .string()
    .required('purchase year is required'),
  designLoad: yup
    .string()
    .required('design load is required'),
  actualLoad: yup
    .string()
    .required('actual load is required'),
  status: yup
    .object()
    .required('status is required'),
  criticalRepairs: yup
    .object()
    .required('critical repairs is required'),
  secured: yup
    .object()
    .required('adequately secured is required'),
  location: yup.string().required('Mobile No. is required!'),
  value: yup.string().required('Value is required!'),
  attachment: yup.object()
});


const CreateAssets = () => {

  let location = useLocation();
  const history = useHistory();

  const [statusLoading, setStatusLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [allParents, setAllParents] = useState([]);

  const { state } = location.state as any;

  useEffect(() => {
    retrieveParents();

    console.log("STATE: ", state);
 }, []);

 const defaultValues = {
   assetType: state.type,
   assetParent: state.parent,
   description: state.description,
   brand: state.brand,
   installationYear: state.installationYear,
   purchaseYear: state.purchaseYear,
   designLoad: state.designLoad,
   actualLoad: state.actualLoad,
   status: state.status,
   criticalRepairs: state.criticalRepairs,
   secured: state.secured,
   location: "",
   value: state.value,
   attachment: state.image
 };

  const {
    register,
    handleSubmit,
    control,
    setError,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(superadminSchema),
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBP68mfPt4CblP3abb_n8f0ThEI8m-Rq3I"
  })

  const retrieveParents = () => {
    SERVICES.get(`assets/parents`)
    .then(response => {
        const res = response.data.data;
        setAllParents(res);
    })
    .catch(error => {
        const resError = error.response ? error.response.data.message : "Something went wrong please try again";
        console.log(resError);
    })

  }

  const handleGoBack = () => {
      history.goBack();
  }
//state?.location.latitude,
  function onSubmit({ assetType, assetParent, description, brand, installationYear,
    purchaseYear, designLoad, actualLoad, status, criticalRepairs, secured, location, value, attachment }: FormValues) {

      const locationString = location.split(",");

      const coordinates = {
        latitude: locationString[0],
        longitude: locationString[1]
      };

      let parent = null;

      if(assetParent !== null) {
        parent = assetParent._id;
      }


      if(!statusLoading) {

          setStatusLoading(true);

          const obj = {
            type: assetType.value,
            parent: parent,
            description: description,
            brand: brand,
            installationYear: installationYear,
            purchaseYear: purchaseYear,
            designLoad: designLoad,
            actualLoad: actualLoad,
            status: status.value,
            criticalRepairs: criticalRepairs.value,
            secured: secured.value,
            location: coordinates,
            value: value,
            image: attachment
          };

          SERVICES.post(`assets/create`, obj)
          .then(response => {
            const res = response.data;
            console.log(res);
            setStatusLoading(false);
            setSuccessMsg("Asset Created Successfully!");

          })
          .catch(error => {
            setStatusLoading(false);
            const resError = error.response ? error.response.data.message : "Something went wrong please try again";
            setErrorMsg(resError);
            console.log(error.response.status);
            console.log(error.response.data.error);
          });
      }
  }

  const onInvalid = (errors: any) => console.error(errors)

  const type = watch('assetType');

  return (
    <div className="flex items-center flex-col w-full bg-[#FFFFFF] mt-10 pt-6 px-20 pb-10">
      <div className="flex w-full items-center">
        <button
        className="relative h-7 w-7 flex justify-center items-center rounded-full hover:bg-gray-200 focus:bg-gray-200 mr-6"
        onClick={handleGoBack}
        >
          <BackArrowIcon className="w-6 h-6" />
        </button>
        <span className="text-body text-[28px] font-bold">Asset Details</span>
      </div>
      <div className="mt-8 w-full px-4">
          <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
              {errorMsg ? (
                <Alert
                  message={errorMsg}
                  variant="error"
                  closeable={true}
                  className="my-4"
                  onClose={() => setErrorMsg("")}
                />
              ) : null}

              {successMsg ? (
                <Alert
                  message={successMsg}
                  variant="success"
                  className="my-4"
                  onClose={() => setSuccessMsg("")}
                />
              ) : null}

              {successMsg === '' ? (
                <>
                  <Input
                    label="Description/Name"
                    {...register('description')}
                    type="text"
                    variant="outline"
                    compulsory={true}
                    className="mb-5"
                    placeholder="Enter asset name/description"
                    error={errors.description?.message!}
                  />

                  <AssetTypeSelect
                    control={control}
                    error={(errors?.assetType as any)?.message}
                    compulsory={true}
                  />

                  {(type !== null && type.value !== "Substation") &&
                    (
                      <AssetParentSelect
                        control={control}
                        error={(errors?.assetParent as any)?.message}
                        compulsory={true}
                        parents={allParents}
                      />
                  )}

                  <Card className="w-full my-6">
                    <FileInput name="attachment" control={control} multiple={false} />
                  </Card>

                  <AssetStatusSelect
                    control={control}
                    error={(errors?.status as any)?.message}
                    compulsory={true}
                  />

                  <Input
                    label="Brand"
                    {...register('brand')}
                    type="text"
                    variant="outline"
                    compulsory={true}
                    className="mb-5"
                    placeholder="Enter brand"
                    error={errors.brand?.message!}
                  />

                  <div className="flex w-full justify-between space-x-4 mb-5">

                    <Input
                      label="Purchase Year"
                      {...register('purchaseYear')}
                      type="number"
                      variant="outline"
                      compulsory={true}
                      min="1900"
                      max="2099"
                      className="w-1/2"
                      placeholder="Enter year of purchase"
                      error={errors.purchaseYear?.message!}
                    />

                    <Input
                      label="Installation Year"
                      {...register('installationYear')}
                      type="number"
                      variant="outline"
                      compulsory={true}
                      min="1900"
                      max="2099"
                      className="w-1/2"
                      placeholder="Enter year of installation"
                      error={errors.installationYear?.message!}
                    />

                  </div>

                  <div className="flex w-full justify-between space-x-4 mb-5">

                    <Input
                      label="Design Allowable Load"
                      {...register('designLoad')}
                      type="number"
                      variant="outline"
                      compulsory={true}
                      className="w-1/2"
                      placeholder="Enter design aloowable load"
                      error={errors.designLoad?.message!}
                    />

                    <Input
                      label="Actual Allowable Load"
                      {...register('actualLoad')}
                      type="number"
                      variant="outline"
                      compulsory={true}
                      className="w-1/2"
                      placeholder="Enter actual allowable load"
                      error={errors.actualLoad?.message!}
                    />

                  </div>

                  <Input
                    label="Location"
                    {...register('location')}
                    type="text"
                    variant="outline"
                    compulsory={true}
                    className="mb-5"
                    placeholder="Latitude, Longitude"
                    error={errors.location?.message!}
                  />
                  <div className="mb-5">
                    {isLoaded &&
                          <GoogleMap
                          id='order-map'
                          mapContainerStyle={{
                            width: '100%',
                            height: '300px'
                          }}
                          center={{
                            lat: Number(state.location.latitude),
                            lng: Number(state.location.longitude)
                          }}
                          zoom={15}
                          onLoad={map => {
                            console.log('DirectionsRenderer onLoad map: ', map)
                          }}
                          onUnmount={map => {
                            console.log('DirectionsRenderer onUnmount map: ', map)
                          }}
                          >
                            <Marker
                               position={{lat:Number(state.location.latitude), lng:Number(state.location.longitude)}}
                             />

                          </GoogleMap>
                        }
                    </div>
                  <Input
                    label="Value"
                    {...register('value')}
                    type="text"
                    variant="outline"
                    compulsory={true}
                    className="mb-5"
                    placeholder="Enter Value"
                    error={errors.value?.message!}
                  />

                  <CriticalRepairsSelect
                    control={control}
                    error={(errors?.criticalRepairs as any)?.message}
                    compulsory={true}
                  />

                  <AdequatelySecuredSelect
                    control={control}
                    error={(errors?.secured as any)?.message}
                    compulsory={true}
                  />

                  <Button
                    className="h-11 w-full mt-8"
                    loading={statusLoading}
                    disabled={statusLoading}
                  >
                    {statusLoading ? "Loading..." : "SAVE"}
                  </Button>
                </>
              ) : null}
          </form>
        </div>
      </div>
    );

}

export default CreateAssets;
