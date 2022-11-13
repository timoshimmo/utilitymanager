import React from 'react';
import Card from '../../components/ui/cards/card';
import { CardUpArrowIcon } from '../../components/icons/card-up-arrow';
import { CalendarIcon } from '../../components/icons/calendar';
import Chart from 'react-apexcharts';

type valueProps = {
  revData: number;
}

const Dashboard = () => {

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
      <div className="w-full h-full px-8 py-10">
          <div className="w-full flex">
            <Card className="w-2/5 h-[180px]">
              <div className="w-full flex justify-between items-center">
                <span className="text-accent text-sm font-bold">CLIENT OVERVIEW</span>
                <CardUpArrowIcon className="w-8 h-8"/>
              </div>
              <div className="w-full flex mt-7">
                <div className="w-1/2 flex flex-col">
                  <span className="text-accent text-xs">TOTAL:</span>
                  <span className="text-accent text-xs mt-2">ACTIVE:</span>
                  <span className="text-accent text-xs mt-2">IN-ACTIVE:</span>
                </div>
                <div className="w-1/2 flex flex-col">
                  <span className="text-body text-xs font-semibold">0</span>
                  <span className="text-body text-xs mt-2 font-semibold">0</span>
                  <span className="text-body text-xs mt-2 font-semibold">0</span>
                </div>
              </div>
            </Card>
            <Card className="w-3/5 h-[180px] ml-4">
              <div className="w-full h-full flex justify-between">
                <div className="w-1/2 h-full flex flex-col justify-between">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-accent text-sm font-bold">ASSET VALUE</span>
                    <CardUpArrowIcon className="w-8 h-8"/>
                  </div>
                  <div className="w-full flex justify-end flex-col">
                    <p className="text-body text-[20px] font-bold">₦0.00</p>
                    <span className="text-accent text-xs">TOTAL FROM 0 ENTRIES</span>
                  </div>
                </div>
                <div className="h-full border border-r-1 border-r-[#F0F0F0] mx-4"></div>
                <div className="w-1/2 flex flex-col justify-between">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-accent text-sm font-bold">TEAM</span>
                    <CardUpArrowIcon className="w-8 h-8"/>
                  </div>
                  <div className="w-full flex justify-end flex-col">
                    <p className="text-body text-[20px] font-bold">0</p>
                    <span className="text-accent text-xs">LAST UPDATED 22 AUG 2022</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="w-full flex mt-4">
            <Card className="w-3/5 h-auto mr-4">
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
            <div className="w-2/5">
              <Card className="w-full h-[180px]">
                <div className="w-full h-full flex flex-col justify-between">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-accent text-sm font-bold">NEW TICKETS</span>
                    <CardUpArrowIcon className="w-8 h-8"/>
                  </div>
                  <div className="w-full flex justify-end flex-col">
                    <p className="text-body text-[20px] font-bold">0</p>
                    <span className="text-accent text-xs">LAST UPDATED 22 AUG 2022</span>
                  </div>
                </div>
              </Card>
              <Card className="w-full h-auto mt-4">
                <div className="w-full">
                  <span className="text-accent text-sm font-bold">ALERT(S) STATISTICS</span>
                  <div className="w-full flex justify-between items-center mt-4 py-4">
                    <div className="w-1/3 flex flex-col items-center">
                      <span className="text-accent text-xs font-semibold uppercase">TODAY</span>
                      <p className="text-body text-[16px] font-bold">0</p>
                    </div>
                    <div className="w-1/3 flex flex-col items-center border-l-2 border-r-2 border-[#F0F0F0] ">
                      <span className="text-accent text-xs font-semibold uppercase">THIS WEEK</span>
                      <p className="text-body text-[16px] font-bold">0</p>
                    </div>
                    <div className="h-full border border-r-1 border-r-[#F0F0F0] mx-2"></div>
                    <div className="w-1/3 flex flex-col items-center">
                      <span className="text-accent text-xs font-semibold uppercase">THIS MONTH</span>
                      <p className="text-body text-[16px] font-bold">0</p>
                    </div>
                  </div>
                  <hr />
                  <ul className="w-full list-none my-5">
                    <li className="w-full">
                      <div className="w-full py-4">
                        <div className="w-full flex justify-between mb-5">
                          <span className="text-muted text-xs w-4/5 mr-2">New Found your system at has 2 high-risk loopholes.</span>
                          <span className="text-[#13A19D] text-xs font-semibold w-1/5 text-right">2 mins</span>
                        </div>
                        <span className="text-[#060552] py-2 px-10 bg-accent/[0.5] text-xs font-semibold w-1/5 text-right">Open</span>
                      </div>
                    </li>
                    <hr className="w-full py-2" />
                    <li className="w-full">
                      <div className="w-full">
                        <div className="w-full flex justify-between mb-5">
                          <span className="text-muted text-xs w-4/5 mr-2">Found your system at has 2 high-risk loopholes,the asset is facing the risk of an attak</span>
                          <span className="text-[#13A19D] text-xs font-semibold w-1/5 text-right">6 hrs</span>
                        </div>
                        <span className="text-[#060552] py-2 px-10 bg-accent/[0.5] text-xs font-semibold w-1/5 text-right">Closed</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
      </div>
  );
};

export default Dashboard;
