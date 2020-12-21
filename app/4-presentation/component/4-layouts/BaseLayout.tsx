import bcl from '0-support/helper/bem-class-list';
import CDNFont from '4-presentation/component/1-atoms/CDNFont';
import React, { FC, memo, PropsWithChildren } from 'react';

interface Props {
  className?: string
}

const BaseLayout: FC<Props> = ({ children, className }) => {
  return (
    <>
      <CDNFont href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" />
      <div className={`${bcl('base-layout')}${className ? ' ' + className : ''}`}>
        {children}
      </div>
    </>
  );
};

export default memo<PropsWithChildren<Props>>(BaseLayout);
