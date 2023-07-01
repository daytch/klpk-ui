import Head from 'next/head'
import React from 'react'

const TermsConditionsPage = () => {
  return (
    <>
      <Head>
        <title>Terms and Conditions</title>
      </Head>
      <section>
        <div className="container space-y-6 py-10">
          <div className="leading-[180%]">
            <h1 className="text-4xl font-bold text-gold-200 mb-3">
              Terms and Conditions
              <br /> Effective Date: 30 June, 2023
            </h1>
            <p className="text-base text-kplkWhite">
              Welcome to the KLPK platform, which is owned and operated by
              Komunitas Literasi Patrick Kellan ("KLPK" "we" or "us"). These
              terms of service are a contract between you and KLPK. By using
              komunitaspatrickkellan.com (the "Site"), creating your KLPK
              account and using the Site or our mobile applications to post
              various content to the KLPK community, including stories you
              create or to access and view KLPK content or other user content,
              you’re agreeing to these Terms and Conditions. If you don’t agree
              to any of these terms, you can’t use the KLPK Services.
            </p>
          </div>
          <div className="leading-[180%]">
            <h2 className="text-2xl font-bold text-gold-200 mb-3">
              You don't always need an account
            </h2>
            <p className="text-base text-kplkWhite mb-2">
              You can’t browse very much on the Site or use the Services without
              registering for an account. To get the most out of the KLPK
              platform, you’ll need to register, choose an username, and set a
              password.
            </p>
            <p className="text-base text-kplkWhite">
              You’re responsible for all the activity on your account, and for
              keeping your password confidential. If you share your account
              information with anyone, that other person may be able to take
              control of the account, and we may not be able to determine who is
              the proper account holder. We will not have any liability to you
              (or anyone you share your account information with) as a result of
              your or their actions under those circumstances. If you find out
              that someone’s used your account without your permission, you
              should report it at Pusat Bantuan
            </p>
          </div>
          <div className="leading-[180%]">
            <h2 className="text-2xl font-bold text-gold-200 mb-3">
              Your Content is Yours
            </h2>
            <p className="text-base text-kplkWhite mb-2">
              You own all the rights to the content you create and post on the
              KLPK Services. Of course, if the content wasn’t yours to begin
              with, putting it on KLPK doesn’t make it yours. Don’t submit
              content you don’t hold the copyright for (unless you have
              permission, including to grant KLPK all the rights outlined in
              these terms).
            </p>
            <p className="text-base text-kplkWhite mb-2">
              When you post content to KLPK, we need the legal permission under
              applicable copyright laws to display that content to users of the
              KLPK Services. Legally this means you give us a nonexclusive
              license to publish your content on the KLPK Services, including
              anything reasonably related to publishing it (like storing,
              displaying, reformatting, and distributing it). You’ll need to
              decide how you want to license your story content to the Wattpad
              community. Please read our guide on Copyrights for assistance in
              making this decision
            </p>
            <p className="text-base text-kplkWhite mb-2">
              You’re responsible for the content you post. This means you assume
              all risks related to its publication and display, including
              someone else’s reliance on its accuracy and any claims relating to
              intellectual property or other legal rights.
            </p>
            <p className="text-base text-kplkWhite mb-2">
              KLPK is a free service and to continue to make it free you
              understand that we enable advertising on the Services, including
              in connection with the display of your content or other
              information. We may also use your Content to promote the Services.
              We will never sell your content to third parties without your
              explicit permission.
            </p>
          </div>

          <div className="leading-[180%]">
            <h2 className="text-2xl font-bold text-gold-200 mb-3">
              Things You Should and Shouldn't Do
            </h2>

            <ul className="list-disc space-y-2 pl-4">
              <li className="text-base text-kplkWhite">
                Don’t distribute software viruses, or anything else (code,
                films, programs) designed to interfere with the proper function
                of any software, hardware, or equipment on the Site (whether it
                belongs to KLPK or anyone else).
              </li>
              <li className="text-base text-kplkWhite">
                Don’t try to interfere with the proper workings of the Services.
                Don’t bypass any measures we’ve put in place to secure the
                Services. Don’t try to damage or get unauthorized access to any
                system, data, password, or other information. Don’t take any
                action that imposes an unreasonable load on our infrastructure,
                or on our third-party providers. (We determine what’s
                reasonable.)
              </li>
              <li className="text-base text-kplkWhite">
                Don’t steal any content from KLPK without permission. Don’t
                change, translate, reproduce, distribute or otherwise create
                derivative works of any content unless you get explicit consent
                from the author of that content.
              </li>
            </ul>
          </div>
          <div className="leading-[180%]">
            <h2 className="text-2xl font-bold text-gold-200 mb-3">
              What We Remove
            </h2>
            <p className="text-base text-kplkWhite mb-2">
              The following are not allowed on KLPK.
            </p>
            <ul className="list-disc space-y-2 pl-4">
              <li className="text-base text-kplkWhite">Plagiarism</li>
              <li className="text-base text-kplkWhite">
                Sexual, pornographic content on KLPK
              </li>
              <li className="text-base text-kplkWhite">LGBT content</li>
              <li className="text-base text-kplkWhite">Political content</li>
              <li className="text-base text-kplkWhite">
                Buzzer are not allowed
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default TermsConditionsPage
