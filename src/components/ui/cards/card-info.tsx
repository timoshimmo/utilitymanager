import React from 'react';
import Card from './card';
import { CardUpArrowIcon } from '../../icons/card-up-arrow';

type CardInfoProps = {
  className?: string;
  title?: string;
  subtitle?: string;
  value?: string;
};

const CardInfo: React.FC<CardInfoProps> = ({
  className,
  title,
  subtitle,
  value
}) => {

  return (
    <Card className={className}>
      <div className="w-full h-full flex flex-col justify-between">
        <div className="w-full flex justify-between items-center">
          <span className="text-accent text-sm font-bold">{title}</span>
          <CardUpArrowIcon className="w-8 h-8"/>
        </div>
        <div className="w-full flex justify-end flex-col">
          <p className="text-body text-[20px] font-bold">{value}</p>
          <span className="text-accent text-xs">{subtitle}</span>
        </div>
      </div>
    </Card>
  );
};


export default CardInfo;
