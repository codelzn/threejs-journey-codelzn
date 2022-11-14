import Link from 'next/link';
export default function R3fHome() {
  const routesNum = 10;
  return (
    <>
      <h1>R3f lesson</h1>
      <ul>
        {[...Array(routesNum)].map((v, i) => (
          <li key={i}>
            <Link href={`/r3f/sketch${i > 8 ? '' : '0'}${i + 1}`}>{`sketch${
              i + 1
            }`}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
