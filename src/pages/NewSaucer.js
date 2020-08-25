import React, { useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FirebaseContext } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import FileUploader from 'react-firebase-file-uploader';


export const NewSaucer = () => {

  // context firebasse
  const { firebase } = useContext(FirebaseContext)

  // state
  const [image, setImage] = React.useState(false)
  const [upload, setUpload] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [urlImage, setUrlImage] = React.useState('')

  //console.log(firebase)

  // useNavigate
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      category: '',
      image: '',
      description: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'The Saucer needed has minimum 3 characters')
        .required('The Saucer need a Name'),
      price: Yup.number()
        .min(1, 'Is necesary a price')
        .required('Is necesary a price'),
      category: Yup.string()
        .required('Is necesary a category'),
      /*image: Yup.string()
        .required('Is necesary a image'),*/
      description: Yup.string()
        .min(10, 'Is necesary a description')
        .required('Is necesary a description'),
    }),
    onSubmit: saucer => {
      try {
        console.log('saucer', saucer)
        saucer.existencia = true
        saucer.image = urlImage
        firebase.db.collection('products').add(saucer)

        //redirect
        navigate('/menu')
      } catch(err) {
        console.log(err)
      }
    }
  })

  const handleUploadStart = () => {
    setProgress(0)
    setUpload(true)
  }

  const handleUploadError = err => {
    setUpload(false)
    console.log(err)
  }

  const handleUploadSuccess = name => {
    setProgress(100)
    setUpload(false)

    // set URL
    const url = firebase.storage.ref('Products').child(name).getDownloadURL()

    console.log(url)
    setUrlImage(url)
  }

  const handleProgress = progress => {
    setProgress(progress)
    console.log(progress)
  }

  return (
    <div>
      <h1 className='text-3xl font-light mb-4'>New Saucer</h1>
      <div className='flex justify-center mt-10'>
        <div className='w-full max-w-3xl'>
          <form onSubmit={formik.handleSubmit}>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>Name</label>
              <input
                type='text'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='name'
                placeholder='Name Saucer'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div className='bg-red-199 border-l-4 border-red-500 text-red-700 p-4 mb-5' role='alert'>
                <p>Something is bad</p>
                <p className=''>{formik.errors.name}</p>
              </div>
            ): null}
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price'>Price</label>
              <input
                type='number'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='price'
                placeholder='20$'
                min='0'
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.price && formik.errors.price ? (
              <div className='bg-red-199 border-l-4 border-red-500 text-red-700 p-4 mb-5' role='alert'>
                <p>Something is bad</p>
                <p className=''>{formik.errors.price}</p>
              </div>
            ): null}
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='category'>Category</label>
              <select className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='category' value={formik.values.category} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                <option>-- Seleccione -- </option>
                <option value='breakfast'> Breakfast </option>
                <option value='eat'> Eat </option>
                <option value='dinner'> Dinner </option>
                <option value='dessert'> Dessert </option>
                <option value='salad'> Salad </option>
              </select>
            </div>
            {formik.touched.category && formik.errors.categpry ? (
              <div className='bg-red-199 border-l-4 border-red-500 text-red-700 p-4 mb-5' role='alert'>
                <p>Something is bad</p>
                <p className=''>{formik.errors.category}</p>
              </div>
            ): null}
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='image'>Image</label>
              <FileUploader
                accept='image/*'
                id='image'
                name="image"
                randomizeFilename
                storageRef={firebase.storage.ref('Products')}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              />
              { upload && (
                <div className='h-12 w-full border'>
                  <div className='bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center' style={{ width: `${progress}%`}}>
                  { progress} %
                  </div>
                </div>
              )}
              { urlImage && (
                <p className='bg-green-500 text-white p-3 text-center my-5'>Upload successfully</p>
              )}
              {/*<input
                type='file'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='image'
                value={formik.values.image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />*/}
            </div>
            {/*formik.touched.image && formik.errors.image ? (
              <div className='bg-red-199 border-l-4 border-red-500 text-red-700 p-4 mb-5' role='alert'>
                <p>Something is bad</p>
                <p className=''>{formik.errors.image}</p>
              </div>
            ) : null*/}
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='descripcion'>Descripcion</label>
              <textarea
                id='description'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40'
                placeholder='Description Saucer'
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}>
              </textarea>
            </div>
            {formik.touched.description && formik.errors.description ? (
              <div className='bg-red-199 border-l-4 border-red-500 text-red-700 p-4 mb-5' role='alert'>
                <p>Something is bad</p>
                <p className=''>{formik.errors.description}</p>
              </div>
            ): null}
            <input type='submit' className='bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold' value='Add Saucer' />
          </form>
        </div>
      </div>
    </div>
  )
}
