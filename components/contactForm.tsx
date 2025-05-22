import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import { useForm } from 'react-hook-form'
import LoadingSpinner from './loadingSpinner'
import {Lang} from 'utils/lang'
import { useStore } from 'store/dataStore'

export default function ContactForm() {
  const { register, handleSubmit,reset, formState, formState: { isSubmitSuccessful } } = useForm()
  const [btnLoading,setBtnLoading] = useState<boolean>(false)
  const [postSubmitted,setPostSubmitted] = useState<boolean>()
  const {pageLang, setPageLang} = useStore()
  
  const onSubmit = async data => {

    console.log(data)
    setBtnLoading(true); 
    const action = 'https://sentieri-admin.caitortona.net/wp-json/contact-form-7/v1/contact-forms/197/feedback'
    const method = 'post'
    const body = new FormData()
    body.append('yourname', data.yourname)
    body.append('youremail', data.youremail)
    body.append('message', data.message)

    try {
      const response = await fetch(action, {
        method,
        body,
      })

      const responseData = await response.json()

      console.log(responseData)
      setTimeout(() => {setBtnLoading(false)}, 1500)
      // Determine if the submission is not valid
      //   if (isFormSubmissionError(responseData)) {
      //     // Handle the case when there are validation errors
      //     setFormError(true);
      //   } else {
      //     // Handle the happy path
      //     setFormError(false);
      //   }
    } catch (error) {
      // Handle the case when there's a problem with the request
      console.error('Error submitting form:', error)
    }
  }

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ 
        yourname: "",
        youremail:"",
        message:""
     })
    }
  }, [formState, reset])
  
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="md:w-[600px] mx-auto bg-white p-4 border rounded-md">
        <div>
          {/* <label htmlFor="yourname">First Name</label> */}
          <input
            className="bg-white border block w-full rounded-md py-1 pl-2 mt-2 mb-3"
            id="yourname"
            name="yourname"
            placeholder={Lang[pageLang].contatti.nome} 
            {...register('yourname')}
          />
        </div>

        <div>
          {/* <label htmlFor="youremail">Email</label> */}
          <input
            className="bg-white border block w-full rounded-md py-1 pl-2 mt-2 mb-3"
            id="youremail"
            placeholder={Lang[pageLang].contatti.email} 
            type="email"
            name="youremail"
            {...register('youremail')}
          />
        </div>
        <div>
          <p>
            {/* <label> Your message</label> */}
            <span className="wpcf7-form-control-wrap" data-name="message">
              <textarea
                className="bg-white border block w-full rounded-md py-1 pl-2 mb-3"
                aria-invalid="false"
                name="message"
                placeholder={Lang[pageLang].contatti.messaggio} 
                {...register('message')}
              />
            </span>
          </p>
        </div>
        <button type="submit" className="bg-forest-green-500 px-3 py-2 rounded-lg w-20 text-white mb-6">
        {btnLoading ? <div className='-mt-1 mb-2 h-5 w-5 mx-3'><LoadingSpinner /></div> : `${Lang[pageLang].contatti.submit}` }
        </button>
      </form>
    </div>
  )
}
