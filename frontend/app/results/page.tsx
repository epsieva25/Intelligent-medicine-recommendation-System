import { Header } from "@/components/header"
import { ResultsDisplay } from "@/components/results-display"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ResultsPage({
  searchParams,
}: {
  searchParams: { symptoms: string; disease: string }
}) {
  const { symptoms, disease } = searchParams

  if (!symptoms || !disease) {
    redirect("/")
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <div className="mb-6 max-w-4xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Symptom Checker
            </Button>
          </Link>
        </div>

        <div className="mt-4">
          <ResultsDisplay symptoms={symptoms} disease={disease} />
        </div>

        <div className="mt-12 max-w-4xl mx-auto text-center">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 shadow-sm">
            <p className="text-gray-600 text-sm">
              <strong>Disclaimer:</strong> This tool provides general information and is not a substitute for
              professional medical advice. Always consult with a healthcare professional for proper diagnosis and
              treatment.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

