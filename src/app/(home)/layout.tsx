import React from 'react';
import RootLayout, { metadata } from '../[locale]/layout';
import { routing } from '@/i18n/routing';

export async function generateMetadata() {
  return metadata;
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RootLayout
      params={
        new Promise((resolve) => resolve({ locale: routing.defaultLocale }))
      }
    >
      {children}
    </RootLayout>
  );
};

export default Layout;
