import Link from "next/link";
export default function Home() {
  return (
    <main>
      <h1>CPRG 306: Web Development 2 - Assignments</h1>
         <div className=" flex justify-center items-start">
        <Link className="p-10 bg-gray-600 text-white rounded-lg" href="/week-5">
          <button type="button">week-5</button></Link>
      </div>
      <div className=" flex justify-center items-start">
        <Link className="p-10 bg-gray-600 text-white rounded-lg" href="/week-2">
          <button type="button">week-2</button></Link>
      </div>
      <br />
      <div className=" flex justify-center items-start">
        <Link href="/week-3">
          <button className=" m-5 p-10 bg-gray-600 text-white rounded-lg" type="button">week-3</button></Link>
      </div>
      <div className=" flex justify-center items-start">
        <Link href="/week-4">
          <button className=" m-5 p-10 bg-gray-600 text-white rounded-lg" type="button">week-4</button></Link>
      </div>
    </main>
  );

}
