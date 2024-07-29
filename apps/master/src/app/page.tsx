import { add } from "@aio/sample-lib";
export default function Home() {
  return (
    <>
      <div>hello master {add(777, 111)}</div>
    </>
  );
}
