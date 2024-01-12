import ContactForm from 'components/contactForm'
import React from 'react'

function Contatti() {
  return (
    <div className="container">
      <header className="text-center my-8">
        <h1 className="px-5 py-1 mb-0 text-2xl md:text-3xl font-bold text-center text-sushi-700">Contatti</h1>
      </header>
      <ContactForm />
    </div>
  )
}

export default Contatti
