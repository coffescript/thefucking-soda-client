import React, { useContext, useRef } from 'react'
import { FirebaseContext } from '../utils/firebase'
const Saucer = ({ sauce }) => {

    // exist ref
    const existRef = useRef(sauce.existencia)

    // context firebase
    const { firebase } = useContext(FirebaseContext)

    const { id, name, price, category, image, existencia, description } = sauce

    const updateAvailable = () => {

        const existing = (existRef.current.value === 'true')

        // console.log(typeof existing)
        try {
          firebase.db.collection('products').doc(id).update({
            existencia: existing
        })
        } catch (error) {
          console.log(error)
        }

    }

    return (
        <div className='w-full px-3 mb-4'>
            <div className='p-5 shadow-md bg-white'>
                <div className='lg:flex'>
                    <div className='lg:w-5/12 xl:w-3/12'>
                        <img src={image} alt='image sauce' />
                        <div className='sm:flex sm:-mx-2 pl-2'>
                            <label className='block mt-5 sm:w-2/4'>
                                <span className='block text-gray-800 mb-2'>Existencia</span>
                                <select
                                    className='bg-white shadow appareance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                                    value={existencia}
                                    ref={existRef}
                                    onChange={() => updateAvailable()}>
                                    <option value='true'>Disponible</option>
                                    <option value='false'>No Disponible</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className='lg:w-7/12 xl:w9/12 pl-5'>
                        <p className='font-bold text-2xl text-yellow-600 mb-4'>{name}</p>
                        <p className='text-gray-600 mb-4'>Category: <span className='text-gray-700 font-bold'>{category.toUpperCase()}</span></p>
                        <p className='text-gray-600 mb-4'>Description: <span className='text-gray-700 font-bold'>{description}</span></p>
                        <p className='text-gray-600 mb-4'>Price: <span className='text-gray-700 font-bold'>$ {price}</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Saucer