import dynamic from 'next/dynamic';

const Rtest = dynamic(() => import('@/components/Rtest/index'));
export default function R3fHome() {
  return (
    <>
      <Rtest />
    </>
  );
}
