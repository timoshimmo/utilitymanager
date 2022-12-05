import React from 'react';
import Card from '../../components/ui/cards/card';
import { CardUpArrowIcon } from '../../components/icons/card-up-arrow';
import { CalendarIcon } from '../../components/icons/calendar';
import Chart from 'react-apexcharts';
import cn from 'classnames';

type valueProps = {
  revData: number;
}

const AccountsOffice = () => {

  const revData = [10, 20, 100, 170, 180, 400, 500, 150, 250, 180 ,400, 290];

  const options = {
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "65%",
          endingShape: "flat",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
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
      colors: [function({ revData }: valueProps) {
       if(revData > 390) {
           return '#6366F1'
       } else {
           return '#6366F140'
       }
     }],
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
    },
    series: [
      {
        name: "Revenue",
        data: revData,
      },
    ],
  };

  return (
      <div className="w-full flex h-full px-8 py-10">
        <div className="w-3/5 h-full">
          <div className="w-full flex">
            <Card className="w-full h-[180px]">
              <div className="w-full h-full flex justify-between">
                <div className="w-1/2 h-full flex flex-col justify-between">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-accent text-sm font-bold">TOTAL REVENUE</span>
                    <CardUpArrowIcon className="w-8 h-8"/>
                  </div>
                  <div className="w-full flex justify-end flex-col">
                    <p className="text-body text-[20px] font-bold">₦100,000,000.00</p>
                    <span className="text-accent text-xs">LAST UPDATED 27 SEP 2022</span>
                  </div>
                </div>
                <div className="h-full border border-r-1 border-r-[#F0F0F0] mx-4"></div>
                <div className="w-1/2 flex flex-col justify-between">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-accent text-sm font-bold">TOTAL SPENT</span>
                    <CardUpArrowIcon className="w-8 h-8"/>
                  </div>
                  <div className="w-full flex justify-end flex-col">
                    <p className="text-body text-[20px] font-bold">₦80,000,000.00</p>
                    <span className="text-accent text-xs">LAST UPDATED 15 NOV 2022</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="w-full mt-4">
            <Card className="w-full h-auto">
              <div className="w-full flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-accent text-xs font-semibold">REVENUE CHART</span>
                  <span className="text-accent text-[20px] font-bold">₦0.00</span>
                </div>
                <div className="flex px-4 py-2 border border-gray-200 rounded items-center">
                  <button className="relative h-7 w-7 flex justify-center items-center rounded-full hover:bg-gray-200 focus:bg-gray-200">
                    <CalendarIcon className="w-5 h-5 text-accent"/>
                  </button>
                  <span className="text-accent text-xs font-semibold">1 Jan - 31 Dec 2022</span>
                </div>
              </div>
              <div className="flex flex-wrap w-full mt-20" style={{ display: "block" }}>
                <Chart
                  options={options.options}
                  series={options.series}
                  height="350"
                  width="100%"
                  type="bar"
                />
              </div>
            </Card>
          </div>
        </div>

        <div className="w-2/5 h-full pl-4">

          <p className="text-accent text-sm font-semibold uppercase">Transaction History</p>
          <div className="w-full h-full">
            <ul>
            <li className="border-b-2 border-b-gray-100 py-3">
              <div
                role="button"
                  className={cn(
                    'rounded overflow-hidden bg-light w-full p-5 shrink-0 flex-col mb-4 border-2 border-transparent cursor-pointer last:mb-0 hover:bg-light'
                  )}
                >
                    <div className="flex">
                      <div className="w-4/5">
                          <p className="text-body text-sm leading-tight ">Transformers</p>
                          <h6 className="text-accent text-lg font-semibold mt-1 mb-2">₦3,000,000.00</h6>
                          <span className="text-accent text-xs">10 NOV 2022</span>
                      </div>
                      <div className="w-1/5">
                        <div className="w-full flex justify-end h-full">
                          <span className="text-accent flex items-center text-sm font-bold my-1 block">10</span>
                        </div>
                      </div>
                    </div>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
  );
};

export default AccountsOffice;
