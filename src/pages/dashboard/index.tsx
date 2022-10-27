import React from 'react';
import Card from '../../components/ui/cards/card';
import { CardUpArrowIcon } from '../../components/icons/card-up-arrow';

const Dashboard = () => {

  return (
      <div className="w-full h-full px-8 py-10">
          <div className="w-full flex">
            <Card className="w-2/5 h-30">
              <div className="w-full flex justify-between items-center">
                <span className="text-accent text-sm font-semibold">CLIENT OVERVIEW</span>
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
            <Card className="w-3/5 h-30 ml-4">
              <div className="w-full h-full flex justify-between">
                <div className="w-1/2 h-full flex flex-col justify-between">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-accent text-sm font-semibold">ASSET VALUE</span>
                    <CardUpArrowIcon className="w-8 h-8"/>
                  </div>
                  <div className="w-full flex justify-end flex-col">
                    <p className="text-body text-[20px] font-bold">0</p>
                    <span className="text-accent text-xs">TOTAL FROM 0 ENTRIES</span>
                  </div>
                </div>
                <div className="h-full border border-r-1 border-r-[#F0F0F0] mx-4"></div>
                <div className="w-1/2 flex flex-col justify-between">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-accent text-sm font-semibold">TEAM</span>
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
      </div>
  );
};

export default Dashboard;
