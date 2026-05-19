import AppRouter from './AppRouter';

export const metadata = {
  title: 'RavirajOS | Portfolio OS',
  description: 'Interactive Linux-style portfolio OS built with Next.js',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💻</text></svg>',
  },
};

export default function Home() {
  return <AppRouter />;
}
