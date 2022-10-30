import Link from 'next/link';
export default function R3fHome() {
  return (
    <>
      <h1>R3f lesson</h1>
      <ul>
        <li>
          <Link href="/r3f/sketch01">Sketch01</Link>
        </li>
        <li>
        <Link href="/r3f/sketch02">Sketch02</Link>
        </li>
      </ul>
    </>
  );
}
