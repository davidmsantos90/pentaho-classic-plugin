import React, { Suspense } from "react";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

import initAppI18n from "../i18n";

const Provider = ({ children }: { children: React.ReactNode }) => {
  initAppI18n();

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
};

export function withProvider<
  P extends Record<string, unknown> = Record<string, unknown>,
>(WrappedComponent: React.ComponentType<P>) {
  const ComponentWithProvider: React.FC<P> = (props) => {
    return (
      <Provider>
        <Suspense fallback={null}>
          <WrappedComponent {...props} />
        </Suspense>
      </Provider>
    );
  };

  const displayName = WrappedComponent.displayName || WrappedComponent.name;
  ComponentWithProvider.displayName = `withProvider(${displayName})`;

  return ComponentWithProvider;
}

export default Provider;
