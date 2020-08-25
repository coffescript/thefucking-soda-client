import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

// components
import Saucer from '../ui/Saucer'

// firebase
import { FirebaseContext } from '../utils/firebase'

export const Menu = () => {

    const { firebase } = useContext(FirebaseContext)

    const [saucer, setSaucer] = useState([])

    useEffect(() => {
      const getSaucer = async () => {
        let result = await firebase.db.collection('products').onSnapshot(handleSnapshot)
        console.log('result', result)
      }
      getSaucer()
    }, [])

    // snapshot
    function handleSnapshot (snapshot) {
      const saucer = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })

      setSaucer(saucer)
    }

    return (
        <div>
            <h1 className='text-3xl font-light mb-4'>Menu</h1>
            <Link to='/new-saucer' className='bg-blue-800 hover:bg-indigo-700 inline-block mb-5 p-2 text-white uppercase font-bold'>
                Add Saucer
            </Link>
            {saucer.map(sauce => (
              <Saucer key={sauce.id} sauce={sauce} />
            ))}
        </div>


    )
}
