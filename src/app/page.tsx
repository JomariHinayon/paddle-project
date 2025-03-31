import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen bg-white flex flex-col">
      <main 
        className="w-full h-full flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.pinimg.com/736x/1f/82/ee/1f82eeadee88c0acbc8c5364538824ed.jpg')" }}
      >
        <div className="w-[60%] h-full bg-transparent flex justify-center align-center items-center">
          <p className="text-white text-xl">Left Side</p>
        </div>
        <div className="w-[40%] bg-transparent h-full flex justify-center align-center items-center">
          <div className="w-full h-[70%] p-8 justify-center items-center">
            <div className="bg-violet-100 h-full w-full p-4 opacity-90 rounded-lg border-2 border-violet-200 shadow-lg flex flex-col justify-center items-center space-y-4">
              <h1 className="text-2xl font-bold text-violet-800 mb-6">Welcome to Paddle</h1>
              
              <div className="flex flex-col space-y-3 w-full max-w-xs">
                <Link 
                  href="/signup" 
                  className="w-full px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-center font-medium"
                >
                  Sign Up
                </Link>
                
                <Link 
                  href="/login" 
                  className="w-full px-6 py-3 bg-white text-violet-600 border-2 border-violet-600 rounded-lg hover:bg-violet-50 transition-colors text-center font-medium"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}