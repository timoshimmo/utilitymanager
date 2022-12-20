import React, { useState, useEffect } from 'react';
import Button from '../../components/ui/button';
import { useHistory } from 'react-router-dom';
import Input from '../../components/ui/forms/input';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FilterIcon } from '../../components/icons/filter-icon';
import { SearchWhiteIcon } from '../../components/icons/search-white-icon';
import AssetsTable from "../../components/assets/assets-table";
import Card from '../../components/ui/cards/card';
import { CardUpArrowIcon } from '../../components/icons/card-up-arrow';
import Chart from 'react-apexcharts';
import SERVICES from '../../util/webservices';
import { ROUTES } from '../../lib/route-links';

type FormValues = {
  qdisco: string;
}

type valueProps = {
  revData: number;
}

const searchSchema = yup.object().shape({
  qdisco: yup
    .string()
    .required('Search text is required'),
});


const defaultValues = {
  qdisco: "",
};

const GetAssets = () => {

  const history = useHistory();
  const [allAssets, setAllAssets] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    retrieveAssets();
 }, []);

  const navNew = () => {
      history.push(ROUTES.CREATE_ASSET);
  }

  const retrieveAssets = () => {
    SERVICES.get(`assets/get`)
    .then(response => {
        const res = response.data.data;
        setAllAssets(res);
        setPending(false);
    })
    .catch(error => {
        const resError = error.response ? error.response.data.message : "Something went wrong please try again";
        console.log(resError);
    })

  }

  function onSubmit({ qdisco }: FormValues) {

    console.log("Searching for " + qdisco);
  }


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(searchSchema),
  });

  const valData = [10, 20, 100, 170, 180, 400, 500, 150, 250, 180 ,400, 290];

  const revData = [80, 20];

  const options = {
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
        },
        donut: {
         size: '100%',
         labels: {
            show: true,
          },
          total: {
            show: true,
            showAlways: true,
            fontSize: '18px',
            color: "#131313"
          },
          value:{
            offsetY: -8, // -8 worked for me
            color:'#ff00ff'
          }
       },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true
      },
      colors: ["#6366F140", "#6366F1", "#060552B3", "#060552"],
      labels: ['Property', 'Technology', 'Vehicles', 'Other'],
    },
    series: [80, 20, 50, 35],

  };

  const synchronized = {
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "20%",
          endingShape: "flat",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
      },
      grid: {
        borderColor: "#F3F4F6",
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      colors: ["#6366F1"],
      xaxis: {
        labels: {
          show: true,
          style: {
            colors: "#161F6A",
            fontSize: "14px",
            fontFamily: "'Lato', sans-serif",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          style: {
            color: "#161F6A",
            fontSize: "14px",
            fontFamily: "'Lato', sans-serif",
          },
        },
      },
      markers: {
        size: 4,
        strokeColors: '#6366F1',
        strokeWidth: 2,
        fillOpacity: -1,
        strokeOpacity: 0.9,
      },
    },

    series: [
      {
        name: "Asset",
        data: valData,
      },
    ],
  };

  return (
      <div className="w-full h-full py-10 px-8">
        <div className="w-full flex">
          <Card className="w-2/5 h-[200px] relative">
            <div className="absolute left-[50%]">
              <span className="text-accent text-sm font-bold">ASSET OVERVIEW</span>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-wrap" style={{ display: "block" }}>
                <Chart
                  options={options.options}
                  series={options.series}
                  height="180"
                  width="100%"
                  type="donut"
                />
              </div>

            </div>

          </Card>
          <Card className="w-3/5 h-[200px] ml-4">
            <div className="w-full h-full flex justify-between">
              <div className="w-full h-full flex flex-col justify-between">
                <div className="w-full flex justify-between items-center">
                  <span className="text-accent text-sm font-bold">ASSET VALUE</span>
                </div>
                <div className="flex flex-wrap" style={{ display: "block" }}>
                  <Chart
                    options={synchronized.options}
                    series={synchronized.series}
                    height="150"
                    width="100%"
                    type="line"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="flex items-center flex-col bg-[#FFFFFF] shadow rounded mt-4 pt-6 pb-10">
          <div className="w-full flex justify-between items-center px-6">
            <span className="2xl:text-lg text-sm text-body font-semibold">Assets Table</span>
              <div className="flex grow justify-end items-center 2xl:px-20 px-10">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="flex">
                    <div className="flex relative">
                      <Input
                        {...register('qdisco')}
                        type="text"
                        variant="search"
                        placeholder="Search"
                        className="2xl:w-[250px] xl:w-[200px] lg:w-[160px]"
                        dimension="small"
                      />
                      <label
                        className="absolute right-3 top-5 -mt-2 text-body cursor-pointer"
                      >
                        <FilterIcon className="w-3 h-3"/>
                      </label>

                    </div>
                      <Button
                        className="h-[36px] rounded-none text-xs"
                      >
                        <SearchWhiteIcon className="w-3 h-3" />
                      </Button>
                  </div>
                </form>
                <Button
                className="h-[36px] text-xs 2xl:ml-5 ml-2"
                variant="outline"
                >
                  EXPORT CSV
                </Button>
              </div>
              <Button
              className="h-[36px] w-[120px] text-xs"
              onClick={navNew}
              >
                ADD NEW
              </Button>
            </div>

            <div className="w-full mt-10">
              <AssetsTable
                assets={allAssets}
                loading={pending}
              />
            </div>
          </div>
        </div>
  );
};

export default GetAssets;
