import { NextJSReduxPageContext } from '0-support/types';
import { Record } from 'immutable';

export type PageContext = Record<{
  userAgent: string
  url: Record<{
    canonical: string
    protocol: string
    host: string
    path: string
  }>
}>;

export function emptyPageContext(): PageContext {
  return Record({
    userAgent: '',
    url: Record({
      canonical: '',
      protocol: '',
      host: '',
      path: ''
    })()
  })();
}

export function getPageContext(ctx: NextJSReduxPageContext): PageContext {

  let pageContext: PageContext = emptyPageContext();

  if (ctx.req && ctx.req.headers) {

    // If we're server side then use the request object to build the page context.
    const req: any = ctx.req;
    let path = req.originalUrl;
    const queryIndex = path.indexOf('?');
    if (queryIndex !== -1) {
      path = path.substring(0, queryIndex);
    }
    pageContext = pageContext
      .set('userAgent', ctx.req.headers['user-agent'] || '')
      .setIn(['url', 'protocol'], req.protocol)
      .setIn(['url', 'host'], req.get('host'))
      .setIn(['url', 'path'], path || '/');
  } else {

    // If we're client side then use the window object to build the page context.
    const path = window.location.pathname;
    const host = window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    pageContext = pageContext
      .setIn(['url', 'protocol'], window.location.protocol)
      .setIn(['url', 'host'], host)
      .setIn(['url', 'path'], path || '/');
  }

  const url = pageContext.get('url');
  const canonical = (url.get('protocol') + '://' + url.get('host') + url.get('path')).replace(/\/$/, '');
  pageContext = pageContext.setIn(['url', 'canonical'], canonical);

  return pageContext;
}
