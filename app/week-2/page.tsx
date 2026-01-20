import Link from 'next/link'
import StudentInfo from "./student-info";
export default function Week2Page() {
 return (
<div>
<h1>Week 2</h1>
     <StudentInfo />
     <Link href="/">Home page</Link>
   </div>
 );
}
