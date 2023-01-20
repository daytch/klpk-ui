import React from 'react'

interface IProps {
  children: React.ReactNode
}

const AuthLayout: React.FC<IProps> = ({ children }) => {
  return (
    <main className="bg-dark-200 min-h-screen max-w-[100vw] flex justify-center items-center p-4">
      <section className="flex flex-col md:flex-row justify-between w-full max-w-[959px] bg-dark-100">
        <div className="hidden bg-auth relative md:block md:w-1/2 max-w-[450px]"></div>
        {children}
      </section>
    </main>
  )
}

export default AuthLayout
