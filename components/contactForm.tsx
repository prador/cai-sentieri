import React from 'react'
import ReactDOM from 'react-dom'
import { useForm } from 'react-hook-form'

export default function ContactForm() {
  const { register, handleSubmit } = useForm()
  const onSubmit = async data => {
    console.log(data)

    const action = 'https://wordpress-production-fbed.up.railway.app/wp-json/contact-form-7/v1/contact-forms/197/feedback'
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

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="md:w-[600px] mx-auto bg-white p-4 border rounded-md">
        <div>
          <label htmlFor="yourname">First Name</label>
          <input
            className="bg-white border block w-full rounded-md py-1 pl-2 mt-2 mb-3"
            id="yourname"
            name="yourname"
            placeholder="bill"
            {...register('yourname')}
          />
        </div>

        <div>
          <label htmlFor="youremail">Email</label>
          <input
            className="bg-white border block w-full rounded-md py-1 pl-2 mt-2 mb-3"
            id="youremail"
            placeholder="bluebill1049@hotmail.com"
            type="email"
            name="youremail"
            {...register('youremail')}
          />
        </div>
        <div>
          <p>
            <label> Your message</label>
            <span className="wpcf7-form-control-wrap" data-name="message">
              <textarea
                className="bg-white border block w-full rounded-md py-1 pl-2 mb-3"
                aria-invalid="false"
                name="message"
                {...register('message')}
              />
            </span>
          </p>
        </div>
        <button type="submit" className="bg-sushi-600 px-3 py-2 rounded-lg text-white mb-6">
          Submit
        </button>
      </form>
    </div>
  )
}
