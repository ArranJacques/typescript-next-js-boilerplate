import { emptyPageContext, PageContext as PageContextProps } from '0-support/page';
import React, { createContext, FC, useContext } from 'react';

const PageContext = createContext<PageContextProps>(emptyPageContext());

export const PageContextProvider: FC<{ pageContext: PageContextProps }> = ({ children, pageContext }) => {
  return (
    <PageContext.Provider value={pageContext}>
      {children}
    </PageContext.Provider>
  );
};

export default function usePage() {
  return useContext(PageContext);
};
