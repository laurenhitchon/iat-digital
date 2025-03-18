import { useEffect, useState } from "react"
import { Link } from "react-router"

import { Clock } from "lucide-react"
import { Button } from "./components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card"
import placeholderImg from "./assets/placeholder.svg"
import { Course } from "./types/types"

function App() {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    async function getCourses() {
      const response = await fetch(`http://localhost:5050/courses/`)
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`
        console.error(message)
        return
      }
      const records = await response.json()
      setCourses(records)
    }
    getCourses()
    return
  }, [courses.length])

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]" />
      <main className="mx-auto max-w-7xl sm:px-6 lg:px-8 relative py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-zinc-950">
            Featured Courses
          </h1>
          <p className="text-xl text-zinc-500">
            Expand your knowledge with our comprehensive courses
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="group relative overflow-hidden border border-zinc-200 rounded-xl bg-white/50 backdrop-blur-sm py-0"
            >
              <CardHeader className="p-0">
                <div className="relative aspect-[2/1] w-full overflow-hidden">
                  <img
                    src={course.image || placeholderImg}
                    alt={course.title}
                    className="object-cover transition duration-300 group-hover:scale-105 absolute w-full h-full text-transparent inset-0"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-6">
                <CardTitle className="mb-2 line-clamp-1 text-zinc-950">
                  {course.title}
                </CardTitle>
                <p className="text-zinc-500 line-clamp-3 mb-4">
                  {course.description}
                </p>
                <div className="flex items-center text-zinc-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{course.hours} hours</span>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button
                  asChild
                  className="w-full bg-zinc-900 text-white hover:bg-zinc-800"
                >
                  <Link to={`/courses/${course.slug}`}>View Course</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </>
  )
}

export default App
