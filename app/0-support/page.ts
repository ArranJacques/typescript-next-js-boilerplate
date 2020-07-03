import { Record } from 'immutable';
import { DeviceContext } from '0-support/device-detect';

export interface PageProps {
    pageContext: PageContextProps
    device: DeviceContext
}

export type PageContextProps = Record<{
    userAgent: string
    url: Record<{
        canonical: string
        protocol: string
        host: string
        path: string
    }>
}>;