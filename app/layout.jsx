import './globals.css';

export const metadata = {
  title: 'LiveStream — Watch Live Events Worldwide',
  description: 'Discover and stream live events in Tech, Music, Sports, Business & Education.',
  openGraph: {
    title: 'LiveStream — Watch Live Events Worldwide',
    description: 'Discover and stream live events in Tech, Music, Sports, Business & Education.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
