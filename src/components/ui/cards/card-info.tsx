import React from 'react';
import Card from './card';
import cn from 'classnames';
import { CardUpArrowIcon } from '../../icons/card-up-arrow';

type CardInfoProps = {
  title?: string;
  subtitle?: string;
  value?: string;
};

const CardInfo: React.FC<CardInfoProps> = ({
  title,
  subtitle,
  value
}) => {

  return (
      <div className="p-5 md:p-8 bg-light shadow rounded">
          <div className="flex justify-between">
            <span className="">{title}</span>
            <CardUpArrowIcon />
          </div>
          <div className="w-full mt-10">
            <span className="text-sm text-body font-bold">{value}</span>
            <span className="text-xs text-body text-accent">{subtitle}</span>
          </div>
      </div>
  );
};


export default CardInfo;
