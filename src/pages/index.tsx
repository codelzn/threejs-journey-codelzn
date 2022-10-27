import dynamic from 'next/dynamic';

const Test = dynamic(() => import('@/components/Test/index'));

export default function Home() {
  return (
    <>
      <Test />
    </>
  );
}
