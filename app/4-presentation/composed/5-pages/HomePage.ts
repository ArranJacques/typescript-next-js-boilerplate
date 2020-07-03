import Page from '4-presentation/components/5-pages/home/HomePage';
import hello from '3-wrapper/containers/hello-container';
import pageWithDevice from '3-wrapper/containers/page-with-device';

export default hello(pageWithDevice(Page));
