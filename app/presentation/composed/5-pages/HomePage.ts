import Page from 'presentation/components/5-pages/home/HomePage';
import hello from 'presentation/containers/hello-container';
import pageWithDevice from 'presentation/containers/page-with-device';

export default hello(pageWithDevice(Page));
