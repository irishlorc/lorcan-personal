import { useEffect } from 'react';
import { SiteProvider, useSite } from './site';
import { site } from './config';
import { META } from './content';
import { Layout } from './components/Layout';
import { usePointerFx, useReveal } from './hooks/useCardFx';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Experience } from './pages/Experience';
import { Contact } from './pages/Contact';

const PAGES = { home: Home, about: About, experience: Experience, contact: Contact };

function Site() {
  const { route, reduced } = useSite();
  usePointerFx(reduced);
  useReveal(route, reduced);

  useEffect(() => {
    document.title = META[route].title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', META[route].description);
  }, [route]);

  const Page = PAGES[route];
  return (
    <Layout>
      <Page />
    </Layout>
  );
}

export function App() {
  useEffect(() => {
    document.body.setAttribute('data-grain', site.grain ? 'on' : 'off');
    document.body.classList.toggle('photos-color', !site.monochrome);
  }, []);
  return (
    <SiteProvider>
      <Site />
    </SiteProvider>
  );
}
