import { setUa } from 'support/device-detect';

interface Props {
    userAgent: string | null
}

export default function bootstrap(props: Props): void {
    // Set the browser user agent for device detection.
    if (props.userAgent) {
        setUa(props.userAgent);
    }
}
