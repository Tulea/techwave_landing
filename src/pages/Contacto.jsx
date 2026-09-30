import { contact } from '../data/content.js'
import SectionHeading from '../components/SectionHeading.jsx'
import ContactForm from '../components/contact/ContactForm.jsx'
import ContactInfo from '../components/contact/ContactInfo.jsx'

export default function Contacto() {
  return (
    <section className="section">
      <div className="container-site">
        <SectionHeading eyebrow={contact.eyebrow} title={contact.title} align="left" as="h1" />
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </section>
  )
}
