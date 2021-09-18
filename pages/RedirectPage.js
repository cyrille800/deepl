import { useRouter } from 'next/router';
import React, {useEffect} from 'react'

function RedirectPage() {

    const router = useRouter();

    useEffect(() => {
        let chaine = "/MainCompo?page=1";
        router.push(chaine, undefined, { shallow: true });     
    })
    return (
        <div>
            
        </div>
    )
}

export default RedirectPage
