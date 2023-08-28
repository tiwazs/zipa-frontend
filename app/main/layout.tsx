import TopBar from "./topBar"

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <>
          <TopBar />
          <div className=''>
              {/* Div Background */}
              {children}
          </div>
        </>
    )
  }