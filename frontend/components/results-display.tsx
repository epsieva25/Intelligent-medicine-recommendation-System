"use client";

import { useState } from "react";
import {
  Pill,
  Info,
  Shield,
  Dumbbell,
  Utensils,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getDiseaseInfo } from "@/lib/data";

export function ResultsDisplay({
  symptoms,
  disease,
}: {
  symptoms: string;
  disease: string;
}) {
  const [activeTab, setActiveTab] = useState("description");
  const symptomsList = symptoms.split(",");

  // Fallback in case data is undefined
  const {
    description = ["Description not available."],
    precautions = [],
    medications = [],
    workout = [],
    diet = [],
  } = getDiseaseInfo(disease) || {};

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-md border-blue-100 md:col-span-2">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <CardTitle className="text-xl md:text-2xl">
              Diagnosis Results
            </CardTitle>
            <CardDescription className="text-blue-100">
              Based on your reported symptoms
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Your Symptoms:
              </h3>
              <div className="flex flex-wrap gap-2">
                {symptomsList.map((symptom) => (
                  <Badge
                    key={symptom}
                    variant="outline"
                    className="bg-gray-100"
                  >
                    {symptom.replace(/_/g, " ")}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Predicted Condition:
              </h2>
              <Badge className="text-lg py-1 px-3 bg-blue-600 text-white">
                {disease}
              </Badge>

              <Alert className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Important Note</AlertTitle>
                <AlertDescription>
                  This is an AI-generated prediction based on your symptoms. For
                  accurate diagnosis, please consult with a healthcare
                  professional.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-blue-100">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-lg">Condition Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <OverviewItem
                icon={<Info className="h-5 w-5 text-blue-600" />}
                label="Description"
                detail="Basic information about the condition"
              />
              <OverviewItem
                icon={<Shield className="h-5 w-5 text-blue-600" />}
                label="Precautions"
                detail={`${precautions.length} recommended precautions`}
              />
              <OverviewItem
                icon={<Pill className="h-5 w-5 text-blue-600" />}
                label="Medications"
                detail={`${medications.length} potential medications`}
              />
              <OverviewItem
                icon={<Dumbbell className="h-5 w-5 text-blue-600" />}
                label="Exercise"
                detail={`${workout.length} workout recommendations`}
              />
              <OverviewItem
                icon={<Utensils className="h-5 w-5 text-blue-600" />}
                label="Diet"
                detail={`${diet.length} dietary suggestions`}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border-blue-100">
        <CardHeader>
          <CardTitle>Detailed Recommendations</CardTitle>
          <CardDescription>
            Comprehensive information and recommendations for {disease}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger
                value="description"
                className="flex items-center gap-2"
              >
                <Info className="h-4 w-4" />
                <span className="hidden sm:inline">Description</span>
              </TabsTrigger>
              <TabsTrigger
                value="precautions"
                className="flex items-center gap-2"
              >
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Precautions</span>
              </TabsTrigger>
              <TabsTrigger
                value="medications"
                className="flex items-center gap-2"
              >
                <Pill className="h-4 w-4" />
                <span className="hidden sm:inline">Medications</span>
              </TabsTrigger>
              <TabsTrigger value="workout" className="flex items-center gap-2">
                <Dumbbell className="h-4 w-4" />
                <span className="hidden sm:inline">Workout</span>
              </TabsTrigger>
              <TabsTrigger value="diet" className="flex items-center gap-2">
                <Utensils className="h-4 w-4" />
                <span className="hidden sm:inline">Diet</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description">
              <InfoCard title={`About ${disease}`} items={description} />
            </TabsContent>

            <TabsContent value="precautions">
              <ListCard title="Recommended Precautions" items={precautions} />
            </TabsContent>

            <TabsContent value="medications">
              <ListCard
                title="Potential Medications"
                items={medications}
                icon={<Pill className="h-5 w-5 text-blue-600" />}
                note="Always consult with a healthcare professional before taking any medication."
              />
            </TabsContent>

            <TabsContent value="workout">
              <ListCard
                title="Exercise Recommendations"
                items={workout}
                icon={<Dumbbell className="h-5 w-5 text-blue-600" />}
              />
            </TabsContent>

            <TabsContent value="diet">
              <ListCard
                title="Dietary Suggestions"
                items={diet}
                icon={<Utensils className="h-5 w-5 text-blue-600" />}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function OverviewItem({
  icon,
  label,
  detail,
}: {
  icon: JSX.Element;
  label: string;
  detail: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-blue-100 p-2 rounded-full">{icon}</div>
      <div>
        <h3 className="font-medium text-gray-800">{label}</h3>
        <p className="text-sm text-gray-600">{detail}</p>
      </div>
    </div>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="p-6 bg-white rounded-md border border-gray-100 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      {items.map((item, index) => (
        <p key={index} className="text-gray-700 leading-relaxed">
          {item}
        </p>
      ))}
    </div>
  );
}

function ListCard({
  title,
  items,
  icon,
  note,
}: {
  title: string;
  items: string[];
  icon?: JSX.Element;
  note?: string;
}) {
  return (
    <div className="p-6 bg-white rounded-md border border-gray-100 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            {icon || (
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
            )}
            <div>
              <p className="text-gray-700">{item}</p>
            </div>
          </li>
        ))}
      </ul>
      {note && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-md">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> {note}
          </p>
        </div>
      )}
    </div>
  );
}
