import { Suspense } from 'react';
import MagazineViewer from './components/MagazineViewer';


export default function MagazinePage() {
  return (
    <Suspense fallback={null}>
      <MagazineViewer />
    </Suspense>
  );
}


