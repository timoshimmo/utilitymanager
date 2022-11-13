import React from 'react';
import Card from './card';
import { CardUpArrowIcon } from '../../icons/card-up-arrow';

type CardGroupProps = {
  className?: string;
  titleLeft?: string;
  titleRight?: string;
  subtitleLeft?: string;
  subtitleRight?: string;
  valueLeft?: string;
  valueRight?: string;
};

const CardGroup: React.FC<CardGroupProps> = ({
  className,
  titleLeft,
  titleRight,
  subtitleLeft,
  subtitleRight,
  valueLeft,
  valueRight
}) => {

  return (
    <Card className={className}>
      <div className="w-full h-full flex justify-between">
        <div className="w-1/2 h-full flex flex-col justify-between">
          <div className="w-full flex justify-between items-center">
            <span className="text-accent text-sm font-bold">{titleLeft}</span>
            <CardUpArrowIcon className="w-8 h-8"/>
          </div>
          <div className="w-full flex justify-end flex-col">
            <p className="text-body text-[20px] font-bold">{valueLeft}</p>
            <span className="text-accent text-xs">{subtitleLeft}</span>
          </div>
        </div>
        <div className="h-full border border-r-1 border-r-[#F0F0F0] mx-4"></div>
        <div className="w-1/2 flex flex-col justify-between">
          <div className="w-full flex justify-between items-center">
            <span className="text-accent text-sm font-bold">{titleRight}</span>
            <CardUpArrowIcon className="w-8 h-8"/>
          </div>
          <div className="w-full flex justify-end flex-col">
            <p className="text-body text-[20px] font-bold">{valueRight}</p>
            <span className="text-accent text-xs">{subtitleRight}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};


export default CardGroup;
