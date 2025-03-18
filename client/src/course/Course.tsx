import { useParams } from "react-router"
import { useEffect, useState } from "react"
import { Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Course as CourseType } from "../types/types"

export default function Course() {
  const params = useParams()
  const [courses, setCourses] = useState<CourseType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getCourses() {
      try {
        const response = await fetch(`http://localhost:5050/courses/`)
        if (!response.ok) {
          console.error(`An error occurred: ${response.statusText}`)
          return
        }
        const records = await response.json()
        setCourses(records)
      } catch (error) {
        console.error("Failed to fetch courses:", error)
      } finally {
        setLoading(false)
      }
    }
    getCourses()
  }, [])

  console.log(courses)

  const course = courses.find((course) => course.slug === params.slug)

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>
  }

  if (!course) {
    return (
      <div className="text-center text-red-500">
        <p>Course not found.</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-8">
        <div className="relative aspect-video overflow-hidden rounded-xl border border-zinc-200 bg-white/50 backdrop-blur-sm">
          <img
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            className="object-cover absolute w-full h-full text-transparent inset-0"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-zinc-950">
            {course.title}
          </h1>
          <div className="flex items-center text-zinc-500 mb-6">
            <Clock className="h-4 w-4 mr-2" />
            <span>{course.hours} hours</span>
          </div>
          <p className="text-xl text-zinc-500 mb-8">{course.longDescription}</p>
          <Button
            size="lg"
            className="w-full sm:w-auto bg-zinc-900 text-white hover:bg-zinc-800"
          >
            Enroll Now
          </Button>
        </div>
      </div>
      <Card className="border-zinc-200 bg-white/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-zinc-950">
            Course Content
          </h2>
          <div className="space-y-6">
            {course.modules?.length > 0 ? (
              course.modules.map((module, index) => (
                <div key={index}>
                  <h3 className="font-medium mb-2 text-zinc-900">
                    {module.title}
                  </h3>
                  <ul className="space-y-2">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-zinc-900 shrink-0" />
                        <span className="text-zinc-500">{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-zinc-500">No modules available.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
