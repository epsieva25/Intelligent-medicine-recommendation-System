import { Stethoscope } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="flex flex-col items-center justify-center text-center py-6">
      <Link href="/" className="flex items-center gap-3">
        <div className="rounded-full bg-blue-600 p-3 shadow-lg">
          <Stethoscope className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
          MediSense<span className="text-blue-600">AI</span>
        </h1>
      </Link>
      <p className="mt-3 max-w-2xl text-gray-600 text-lg">
        Advanced Disease Prediction & Medicine Recommendation System
      </p>
    </header>
  )
}

