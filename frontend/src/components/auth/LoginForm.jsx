// src/components/auth/LoginForm.jsx
import Button from '../shared/Button'
import GoogleIcon from '../../assets/icons/googlelogo.svg'
import AppleIcon from '../../assets/icons/applelogo.svg'
import mail1_icon from '../../assets/icons/mail1_icon.svg'
import lock_icon from '../../assets/icons/lock_icon.svg'
import logo_gradient from '../../assets/icons/logo_gradient.svg'
import login_illustrator_1 from '../../assets/images/login_Illustration_1.png';


const LoginForm = () => {
    return (<>
        <div className='grid grid-cols-[60%_40%] bg-bg-nobel-black-700 rounded-2xl w-full max-w-[1280px] min-h-[600px] h-[80vh] max-h-[800px] overflow-hidden'>
            {/* Left Column */}
            <div className="flex flex-col justify-center p-2 max-w-[700px] ml-10">
                <div className="absolute top-10 left-20 -translate-x-1/2 -translate-y-1/2 w-7 h-7">
                    <img
                        src={logo_gradient}
                        alt="Logo"

                    />
                </div>
                <div className=' max-w-[400px] max-h-[600px] ml-40 '>
                    <div className='flex items-center'>
                        <h1 className="text-2xl font-semibold text-white">
                            {/* eslint-disable-next-line */}
                            Let's get
                        </h1>
                        <h1 className='text-2xl font-bold ml-2 bg-gradient-to-r from-[#4D62E5] via-[#87DDEE] to-[#B6F09C] bg-clip-text text-transparent'>
                            creative!
                        </h1>
                    </div>
                    <p className="text-sm text-nobel-black-300 font-extralight mt-3 mb-12">
                        Log in to Artificium to start creating magic.
                    </p>

                    <form className="space-y-4">
                        <div className="relative w-full rounded-lg border border-[#363A3D] bg-[#1A1D21] focus-within:border-transparent focus-within:bg-gradient-to-r focus-within:from-[#82DBF7] focus-within:to-[#B6F09C] focus-within:p-[1px] focus-within:shadow-[0_0_0_2px_#84DCF53D] transition-all">
                            <div className="relative w-full flex items-center bg-[#1A1D21] rounded-lg">
                                <img
                                    src={mail1_icon}
                                    alt=""
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                                />
                                <input
                                    type="email"
                                    placeholder="email"
                                    className="w-full pl-10 p-2 bg-transparent text-xs text-white font-bold outline-none"
                                />
                            </div>
                        </div>



                        <div className="relative w-full rounded-lg border border-[#363A3D] bg-[#1A1D21] focus-within:border-transparent focus-within:bg-gradient-to-r focus-within:from-[#82DBF7] focus-within:to-[#B6F09C] focus-within:p-[1px] focus-within:shadow-[0_0_0_2px_#84DCF53D] transition-all">
                            <div className="relative w-full flex items-center bg-[#1A1D21] rounded-lg">
                                <img
                                    src={lock_icon}
                                    alt=""
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full pl-10 p-2 bg-transparent text-xs text-white font-bold outline-none"
                                />
                            </div>
                        </div>


                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="h-3   w-3 border-[#1A1D21] bg-gray-600 rounded focus:ring-0"
                                />
                                <span className="text-nobel-black-200 text-sm">Remember me</span>
                            </label>
                            <a href="#" className=" font-bold text-sm bg-gradient-to-r from-[#4D62E5] via-[#87DDEE] to-[#B6F09C] bg-clip-text text-transparent">
                                Forgot Password?
                            </a>
                        </div>

                        <Button variant="primary" className="w-full bg-[#B6F09C]">
                            Log in
                        </Button>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#363A3D]"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 text-xs  text-nobel-black-400 bg-nobel-black-700">or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <Button variant="outline" className="w-full bg-nobel-black-600  text-nobel-black-400 text-xs outline-none border-0">
                                <img src={GoogleIcon} alt="Google" className="w-5 h-5 mr-2 " />
                                Google Account
                            </Button>
                            <Button variant="outline" className="w-full bg-nobel-black-600  text-nobel-black-400 text-xs outline-none border-0">
                                <img src={AppleIcon} alt="Apple" className="w-5 h-5 mr-2 " />
                                Apple Account
                            </Button>
                        </div>

                        <div className='absolute bottom left-30 mt-5 '>
                            <p className="mt-8 text-center text-gray-600 text-sm  text-nobel-black-400">
                                {/* eslint-disable-next-line */}
                                Don't have an account?{' '}
                                <a href="#" className=" text-sm ml-2 font-semibold  bg-gradient-to-r from-[#4D62E5] via-[#87DDEE] to-[#B6F09C] bg-clip-text text-transparent">
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center p-1 max-w-[480px] h-full overflow-hidden ">
                <img
                    src={login_illustrator_1}
                    alt=""
                    className="w-full h-full object-cover object-left rounded-2xl"
                />
            </div>
        </div>
    </>
    )
}

export default LoginForm