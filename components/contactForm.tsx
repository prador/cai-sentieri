// // const ContactForm = () => {

// //     return (
// //         <div>
// //         <form action="https://wordpress-production-fbed.up.railway.app/wp-json/contact-form-7/v1/contact-forms/197/feedback" method="post" className="flex flex-col">
// //             <label htmlFor="somebodys-name">Somebodys name</label>
// //             <input id="somebodys-name" type="text" name="somebodys-name" className="bg-white border"/>
// //             <button type="submit">Submit</button>
// //         </form>
// //         </div>

// //     )
// // }

// // export default ContactForm
// import { useForm,SubmitHandler } from "react-hook-form";
// import React, { FormEvent, useState } from 'react';

// type Inputs = {
//     example: string,
//     exampleRequired: string,
//   };

// const ContactForm: React.FC = () => {
//   const [formError, setFormError] = useState<boolean>(false);
//   const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
//   const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

//   console.log(watch("example"))

//   const isFormSubmissionError = (response: any): boolean => {
//     // Implement your logic to check if the submission is not valid
//     // Return true if there are validation errors, false otherwise
//     return false;
//   };

//   const formSubmissionHandler = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
//     event.preventDefault();

//     const formElement = event.currentTarget;
//     // const { action, method } = formElement;
//     const action="https://wordpress-production-fbed.up.railway.app/wp-json/contact-form-7/v1/contact-forms/197/feedback"
//     const method="post"
//     // const body = new FormData(formElement);
//     const body = "input_1 Marian Kenney"

//     try {
//       const response = await fetch(action, {
//         method,
//         body,
//       });

//       const responseData = await response.json();

//       // Determine if the submission is not valid
//       if (isFormSubmissionError(responseData)) {
//         // Handle the case when there are validation errors
//         setFormError(true);
//       } else {
//         // Handle the happy path
//         setFormError(false);
//       }
//     } catch (error) {
//       // Handle the case when there's a problem with the request
//       console.error('Error submitting form:', error);
//     }
//   };

//   return (
//     <div>
//       {/* Display formError message if needed */}
//       {formError && <p>Error in form submission</p>}

//       {/* Your form JSX */}
//       {/* <form onSubmit={formSubmissionHandler}>
//         <button type="submit">Submit</button>
//       </form> */}
//       {/* <form onSubmit={formSubmissionHandler} action="https://wordpress-production-fbed.up.railway.app/wp-json/contact-form-7/v1/contact-forms/197/feedback" method="post" className="flex flex-col">
//             <label htmlFor="somebodys-name">Somebodys name</label>
//             <input id="somebodys-name" type="text" name="somebodys-name" className="bg-white border"/>
//             <button type="submit">Submit</button>
//         </form> */}

// <form onSubmit={handleSubmit(onSubmit)} action="https://wordpress-production-fbed.up.railway.app/wp-json/contact-form-7/v1/contact-forms/197/feedback" method="post">
//       {/* register your input into the hook by invoking the "register" function */}
//       <input defaultValue="test" {...register("example")} />

//       {/* include validation with required or other standard HTML validation rules */}
//       <input {...register("exampleRequired", { required: true })} />
//       {/* errors will return when field validation fails  */}
//       <p><label> Your name<br/>
// <span className="wpcf7-form-control-wrap" data-name="your-name">
//     <input  className="bg-white text-black border wpcf7-form-control wpcf7-text wpcf7-validates-as-required" autocomplete="name" aria-required="true" aria-invalid="false" defaultValue="test" {...register("your-name")} type="text" name="your-name"></input></span> </label>
// </p>
// <p><label> Your email<br/>
// <span className="wpcf7-form-control-wrap" data-name="your-email">
//     <input  className="bg-white border wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email" autocomplete="email" aria-required="true" aria-invalid="false" value="sdfsf@dsfds.cvd" type="email" name="your-email"></input></span> </label>
// </p>
// <p><label> Subject<br/>
// <span className="wpcf7-form-control-wrap" data-name="your-subject">
//     <input  className="bg-white border wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false" value="fwefewfwe" type="text" name="your-subject"></input></span> </label>
// </p>
// <p><label> Your message (optional)<br/>
// <span className="wpcf7-form-control-wrap" data-name="your-message">
//     <textarea cols="40" rows="10" className="bg-white border wpcf7-form-control wpcf7-textarea" aria-invalid="false" name="your-message"></textarea></span> </label>
// </p>
// <p><input className="bg-white border wpcf7-form-control wpcf7-submit has-spinner" type="submit" value="Submit" /></p>
//       {errors.exampleRequired && <span>This field is required</span>}

//       <input type="submit" />
//     </form>

//         <form onSubmit={formSubmissionHandler} action="https://wordpress-production-fbed.up.railway.app/wp-json/contact-form-7/v1/contact-forms/197/feedback" method="post" className="wpcf7-form failed" aria-label="Contact form" novalidate="novalidate" data-status="failed">
// <p><label> Your name<br/>
// <span className="wpcf7-form-control-wrap" data-name="your-name"><input  className="bg-white text-black border wpcf7-form-control wpcf7-text wpcf7-validates-as-required" autocomplete="name" aria-required="true" aria-invalid="false" value="fwefwef" type="text" name="your-name"></input></span> </label>
// </p>
// <p><label> Your email<br/>
// <span className="wpcf7-form-control-wrap" data-name="your-email"><input  className="bg-white border wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email" autocomplete="email" aria-required="true" aria-invalid="false" value="sdfsf@dsfds.cvd" type="email" name="your-email"></input></span> </label>
// </p>
// <p><label> Subject<br/>
// <span className="wpcf7-form-control-wrap" data-name="your-subject"><input  className="bg-white border wpcf7-form-control wpcf7-text wpcf7-validates-as-required" aria-required="true" aria-invalid="false" value="fwefewfwe" type="text" name="your-subject"></input></span> </label>
// </p>
// <p><label> Your message (optional)<br/>
// <span className="wpcf7-form-control-wrap" data-name="your-message"><textarea cols="40" rows="10" className="bg-white border wpcf7-form-control wpcf7-textarea" aria-invalid="false" name="your-message"></textarea></span> </label>
// </p>
// <p><input className="bg-white border wpcf7-form-control wpcf7-submit has-spinner" type="submit" value="Submit" />
// </p><div className="wpcf7-response-output" aria-hidden="true">There was an error trying to send your message. Please try again later.</div>
// </form>
//     </div>
//   );
// };

// export default ContactForm;

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
    <div className="container pt-5 pb-10">
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
