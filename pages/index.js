import { useEffect, useState } from "react"
import { useRouter } from 'next/router'

export default function Home(props) {

  const router = useRouter()
  const [start, setStart] = useState(false)

  useEffect(() => {
    // dispatch(setKeyMap(props.data.keyMap))
    
    setStart(true)
    router.push('/MainCompo')
  }, start)

  return (
    <div className="bg-primary h-screen pt-20">
    <div className="loader">Loading...</div>
   </div>
  )
}

// export async function getServerSideProps(context){
  
//   const res = await fetch('http://localhost:3000/api/data');
//   const data = await res.json();

//   console.log("************************")
//   console.log(data["data"][0]["sentences"])
//   // Pass data to the page via props
//   return { props: { data } };
// }
