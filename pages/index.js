import { useEffect, useState } from "react"
import { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter()
  const [start, setStart] = useState(false)

  useEffect(() => {

    // dispatch(setKeyMap(props.data.keyMap))
    
    // setStart(true)
    setStart(true)
    router.push('/MainCompo')
  }, start)

  return (
    <div className="bg-primary h-screen pt-20">
    <div className="loader">Loading...</div>
   </div>
  )
}
