import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    console.log('aaa');
  });
  return (
    <>
      <h1>Three.js Sketch</h1>
      <Link href="/r3f">toR3f</Link>
    </>
  );
}
