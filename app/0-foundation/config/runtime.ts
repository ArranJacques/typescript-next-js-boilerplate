import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const EXAMPLE_CONFIG = publicRuntimeConfig.EXAMPLE_CONFIG || '#';
