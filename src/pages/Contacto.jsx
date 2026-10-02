import { useContent } from '../i18n.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import SectionHeading from '../components/SectionHeading.jsx'
import ContactForm from '../components/contact/ContactForm.jsx'
import ContactInfo from '../components/contact/ContactInfo.jsx'

export default function Contacto() {
  const { contact } = useContent()
  usePageMeta('contacto')
  return (
    <section className="section">
      <div className="container-site">
        <SectionHeading eyebrow={contact.eyebrow} title={contact.title} align="left" as="h1" />
        <div className="mt-10 grid gap-12 lg:mt-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <ContactForm />
          </div>
          <div className="order-1 lg:order-2">
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  )
}
