import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const {
  EXAMPLE_CONFIG
}: { [key: string]: string } = publicRuntimeConfig;
