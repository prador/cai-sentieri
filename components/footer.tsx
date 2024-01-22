import ContactForm from "./contactForm"

const Footer = () => {
  return (
    <div className="bg-gray-200 p-8">
      <div className="container md:last:flex justify-between">

        <div className="">
          <div className="border py-4">
            CAI Sesione di Tortona
            <br /> Indrizzo
          </div>
          <div className="border py-4">© CAI Tortona 2023</div>

        </div>
        <div><ContactForm /></div>

      </div>
    </div>
  )
}

export default Footer
