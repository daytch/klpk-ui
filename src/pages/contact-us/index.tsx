import React from 'react'
import PageHead from '@/components/templates/seo/PageHead'
import GeneralLayout from '@/components/layouts/general'
import ContactUs from '@/components/organisms/forms/ContactUs'

function AboutUsPage() {
  return (
    <>
      <PageHead />
      <GeneralLayout>
        <section className="py-10">
          <div className="max-w-[500px] p-6 mx-auto bg-dark-100 rounded-lg">
            <ContactUs />
          </div>
        </section>
      </GeneralLayout>
    </>
  )
}

export default AboutUsPage
