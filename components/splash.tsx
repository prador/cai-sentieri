import Image from 'next/image'
import LogoVector from './logoVector'

const Splash = () => {
  return (
    <div className="loading-container bg-[#28752D] w-screen h-screen fixed flex items-center justify-center">
      <div className="h-[360px] w-[180px] left-4 animate-in slide-in-from-bottom-20 fade-in duration-1000">
        {/* <Image src="/logo_sentieri.svg" fill alt="" className='shadow-lg' /> */}
        <LogoVector />
      </div>
    </div>
  )
}
export default Splash
