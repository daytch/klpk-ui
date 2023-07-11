import React from 'react'
import PageHead from '@/components/templates/seo/PageHead'

const PrivacyPolicyPage = () => {
  return (
    <>
      <PageHead />
      <section>
        <div className="container space-y-6 py-10">
          <div className="leading-[180%]">
            <h1 className="text-4xl font-bold text-gold-200 mb-3">
              Privacy Policy <br />
              Effective Date: 30 June, 2023
            </h1>
            <p className="text-base text-kplkWhite mb-2">
              At Komunitas Literasi Patrick Kellan ("KLPK" "we" or "us"), we are
              committed to protecting your privacy and keeping your information
              safe. This Privacy Policy explains how we collect, use, disclose
              and keep information that can identify you ("Personal
              Information") when you create a KLPK account and use
              komunitaspatrickkellan.com (the "Site"), or our mobile
              applications, to post content to the KLPK, including stories you
              create.
            </p>
            <p className="text-base text-kplkWhite mb-2">
              By using KLPK, you agree to the collection and use of your
              personal information as described in this Privacy Policy. This is
              important; we hope you will take time to read it carefully.
            </p>
          </div>

          <div className="leading-[180%]">
            <h2 className="text-base font-bold text-gold-200 mb-3">
              Information We Collect
            </h2>
            <ul className="list-disc space-y-2 pl-4">
              <li className="text-base text-kplkWhite">
                Personal Information <br />
                We may collect the following types of personal information from
                you: Name, Email Address, User-generated content (such as
                stories) that you submit through the KLPK, Usage data and
                analytics (including device information, IP address, browser
                type, and access times)
              </li>
              <li className="text-base text-kplkWhite">
                Non-Personal Information
                <br />
                We may collect non-personal information that does not directly
                identify you, such as aggregated data or statistical information
                about app usage.
              </li>
            </ul>
          </div>
          <div className="leading-[180%]">
            <h2 className="text-base font-bold text-gold-200 mb-3">
              Use of Information
            </h2>
            <ul className="list-disc space-y-2 pl-4">
              <li className="text-base text-kplkWhite">
                Personal Information <br />
                We may user your personal information for the following
                purposes:
                <br />
                To provide and improve the KLPK functionality and user
                experience
                <br />
                To communicate with you, respond to your inquiries, and provide
                customer support
                <br />
                To send you updates, newsletters, and promotional materials
                relates to the KLPK
                <br />
                To enforce our terms of service and prevent misuse of the KLPK
              </li>
              <li className="text-base text-kplkWhite">
                Non-Personal Information
                <br />
                We may use non-personal information for purposes such as data
                analysis, improving KLPK, and enhancing our services
              </li>
            </ul>
          </div>
          <div className="leading-[180%]">
            <h2 className="text-base font-bold text-gold-200 mb-3">
              Your Choices and Rights
            </h2>
            <p className="text-base text-kplkWhite mb-2">
              You have the right to:
            </p>
            <ul className="list-disc space-y-2 pl-4">
              <li className="text-base text-kplkWhite">
                Access, correct, or update your personal information
              </li>
              <li className="text-base text-kplkWhite">
                Request the deletion of your personal information
              </li>
              <li className="text-base text-kplkWhite">
                Opt-out of receiving marketing communications
              </li>
              <li className="text-base text-kplkWhite">
                Object to the processing of your personal information
              </li>
            </ul>
          </div>
          <div className="leading-[180%]">
            <h2 className="text-base font-bold text-gold-200 mb-3">
              Contact Us
            </h2>
            <p className="text-base text-kplkWhite mb-2">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy, please contact us at: Komunitas Literasi Patrick
              Kellan{' '}
              <a href="mailto:redaksiklpk@gmail.com"> redaksiklpk@gmail.com</a>
            </p>
            <p className="text-base text-kplkWhite mb-2">
              Jl H. Agus Salim Kaliawi,
              <br /> Tanjung Karang Pusat. <br />
              Bandar Lampung 35115
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default PrivacyPolicyPage
