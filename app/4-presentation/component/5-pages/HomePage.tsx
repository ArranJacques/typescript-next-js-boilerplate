import { EXAMPLE_CONFIG } from '0-foundation/config/runtime';
import bcl from '0-support/helper/bem-class-list';
import { NextJSReduxPageContext } from '0-support/types';
import { setHello } from '1-data/app/app-actions';
import { WithHelloProps } from '3-wrapper/container/with-hello';
import useDevice from '3-wrapper/context/device-context';
import SEO from '4-presentation/component/1-atoms/SEO';
import BaseLayout from '4-presentation/component/4-layouts/BaseLayout';
import Cloud from '4-presentation/svg/cloud.svg';
import { NextPage } from 'next';
import React, { useEffect } from 'react';

interface Props extends WithHelloProps {
  //
}

const HomePage: NextPage<Props> = ({ hello, randomiseHello }) => {

  const device = useDevice();
  let timer: number | undefined;

  useEffect(() => {
    timer = window.setInterval(randomiseHello, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SEO title={`Hello ${hello}!`} />
      <BaseLayout className={bcl('home-page').toString()}>
        <div className="home-page__cloud">
          <Cloud />
          <a href={EXAMPLE_CONFIG}>Hello {hello}!</a>
        </div>
        <div className="home-page__device">
          You are viewing on a {device.get('type')}
        </div>
      </BaseLayout>
    </>
  );
};

HomePage.getInitialProps = async (ctx: NextJSReduxPageContext): Promise<Props> => {
  ctx.store.dispatch(setHello('World') as any);
  // Suppress TypeScript errors by pretending we're returning the initial props.
  return {} as Props;
};

export default HomePage;

