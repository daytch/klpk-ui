import React from 'react'
import PageHead from '@/components/templates/seo/PageHead'

const DataDeletionPage = () => {
  return (
    <>
      <PageHead
        title="Data Deletion Instructions — KLPK"
        description="Instructions on how to request deletion of your personal data from KLPK."
        url="https://komunitaspatrickkellan.com/data-deletion"
      />
      <section>
        <div className="container space-y-6 py-10">
          <div className="leading-[180%]">
            <h1 className="text-4xl font-bold text-gold-200 mb-3">
              Data Deletion Instructions
            </h1>
            <p className="text-base text-kplkWhite mb-2">
              At Komunitas Literasi Patrick Kellan (&quot;KLPK&quot;), we respect your
              right to privacy and your right to have your personal data
              deleted. This page explains how you can request the deletion of
              your data associated with your KLPK account, including any data
              collected through Facebook Login.
            </p>
          </div>

          <div className="leading-[180%]">
            <h2 className="text-2xl font-bold text-gold-200 mb-3">
              What Data We Store
            </h2>
            <ul className="list-disc space-y-2 pl-4">
              <li className="text-base text-kplkWhite">
                Name and email address
              </li>
              <li className="text-base text-kplkWhite">
                Profile information (username, bio, profile photo)
              </li>
              <li className="text-base text-kplkWhite">
                Content you have created (stories, chapters)
              </li>
              <li className="text-base text-kplkWhite">
                Transaction history and coin balance
              </li>
              <li className="text-base text-kplkWhite">
                Reading activity and subscriptions
              </li>
            </ul>
          </div>

          <div className="leading-[180%]">
            <h2 className="text-2xl font-bold text-gold-200 mb-3">
              How to Request Data Deletion
            </h2>
            <p className="text-base text-kplkWhite mb-4">
              You can request deletion of your personal data by following one
              of the methods below:
            </p>

            <div className="space-y-6">
              <div className="bg-dark-300 rounded-xl p-6">
                <h3 className="text-base font-bold text-gold-200 mb-2">
                  Option 1 — Delete via KLPK App
                </h3>
                <ol className="list-decimal space-y-2 pl-4">
                  <li className="text-base text-kplkWhite">
                    Open the KLPK mobile app
                  </li>
                  <li className="text-base text-kplkWhite">
                    Go to <span className="font-bold">Profile</span> →{' '}
                    <span className="font-bold">Settings</span>
                  </li>
                  <li className="text-base text-kplkWhite">
                    Tap <span className="font-bold">Delete Account</span>
                  </li>
                  <li className="text-base text-kplkWhite">
                    Confirm the deletion request
                  </li>
                </ol>
              </div>

              <div className="bg-dark-300 rounded-xl p-6">
                <h3 className="text-base font-bold text-gold-200 mb-2">
                  Option 2 — Request via Email
                </h3>
                <p className="text-base text-kplkWhite mb-2">
                  Send an email to{' '}
                  <a
                    href="mailto:komunitaspatrickkellan@gmail.com"
                    className="text-gold-200 underline"
                  >
                    komunitaspatrickkellan@gmail.com
                  </a>{' '}
                  with the subject line{' '}
                  <span className="font-bold">&quot;Data Deletion Request&quot;</span>.
                </p>
                <p className="text-base text-kplkWhite">
                  Please include the following information in your email:
                </p>
                <ul className="list-disc space-y-2 pl-4 mt-2">
                  <li className="text-base text-kplkWhite">
                    Your full name
                  </li>
                  <li className="text-base text-kplkWhite">
                    Email address associated with your KLPK account
                  </li>
                  <li className="text-base text-kplkWhite">
                    Username (if applicable)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="leading-[180%]">
            <h2 className="text-2xl font-bold text-gold-200 mb-3">
              What Happens After Your Request
            </h2>
            <ul className="list-disc space-y-2 pl-4">
              <li className="text-base text-kplkWhite">
                We will process your request within{' '}
                <span className="font-bold">30 days</span>
              </li>
              <li className="text-base text-kplkWhite">
                All personal data associated with your account will be
                permanently deleted from our systems
              </li>
              <li className="text-base text-kplkWhite">
                Content you have published may be anonymized rather than
                deleted to preserve platform integrity
              </li>
              <li className="text-base text-kplkWhite">
                You will receive a confirmation email once the deletion is
                complete
              </li>
            </ul>
          </div>

          <div className="leading-[180%]">
            <h2 className="text-base font-bold text-gold-200 mb-3">
              Contact Us
            </h2>
            <p className="text-base text-kplkWhite mb-2">
              If you have any questions regarding data deletion, please contact
              us at:{' '}
              <a
                href="mailto:komunitaspatrickkellan@gmail.com"
                className="text-gold-200 underline"
              >
                komunitaspatrickkellan@gmail.com
              </a>
              <br />
              WhatsApp:{' '}
              <a
                href="https://wa.me/6281330896550"
                target="_blank"
                className="text-gold-200 underline"
                rel="noreferrer"
              >
                +6281330896550
              </a>
            </p>
            <p className="text-base text-kplkWhite mt-4">
              CV JOSH KELLAN <br />
              DUSUN VI, Desa/Kelurahan Tempuran, <br />
              Kec. Trimurjo, Kab. Lampung Tengah, <br />
              Provinsi Lampung, Kode Pos: 34172
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default DataDeletionPage
