<<<<<<< HEAD
import Link from "next/link";
export default function Home() {
  return (
    <main>
      <h1>CPRG 306: Web Development 2 - Assignments</h1>
      <div className=" flex justify-center items-start">
      <Link className="p-10 bg-gray-600 text-white rounded-lg" href="/week-2">
          <button type="button">week-2</button></Link>
        </div>
      <br />
      <div className=" flex justify-center items-start">
      <Link  href="/week-3">
        <button className=" m-5 p-10 bg-gray-600 text-white rounded-lg" type="button">week-3</button></Link>
      </div>
      </main>
=======
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return(
  <main>
    <h1>CPRG 306: Web Development 2 - Assignments</h1>
    <Link href="/week-2">
    <button type="button">Week-2</button>
    </Link>
      </main>

>>>>>>> b334256fe73ede432e21e438f04270fa53bb9fa0
  );
}
