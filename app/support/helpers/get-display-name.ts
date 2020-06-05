import { ComponentType } from 'react';

export default function <P>(Component: ComponentType<P>): string {
    return Component.displayName || Component.name || 'Component';
}
