import { setUa } from '0-support/device-detect';

let bootstrapped = false;

interface Props {
  userAgent: string | null
}

export default function bootstrap(props: Props): void {

  if (!bootstrapped) {

    // Set the browser user agent for device detection.
    if (props.userAgent) {
      setUa(props.userAgent);
    }

    bootstrapped = true;
  }
}
