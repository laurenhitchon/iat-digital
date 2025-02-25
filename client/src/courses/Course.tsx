import { useParams } from "react-router";

import { Clock, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const courses = [
  {
    id: 1,
    slug: "web-development-fundamentals",
    title: "Web Development Fundamentals",
    description:
      "Learn the core concepts of web development, including HTML, CSS, and JavaScript. Perfect for beginners starting their coding journey.",
    longDescription:
      "This comprehensive course will take you from a complete beginner to being confident with the core technologies of web development. You'll learn how to structure web pages with HTML, style them with CSS, and add interactivity with JavaScript. Through hands-on projects and real-world examples, you'll gain practical experience that you can immediately apply to your own projects.",
    hours: 20,
    image: "/placeholder.svg?height=400&width=800",
    modules: [
      {
        title: "Introduction to HTML",
        lessons: ["HTML Document Structure", "Working with Text", "Links and Images", "Forms and Input Elements"],
      },
      {
        title: "CSS Fundamentals",
        lessons: ["CSS Selectors", "Box Model", "Layout Techniques", "Responsive Design"],
      },
      {
        title: "JavaScript Basics",
        lessons: ["Variables and Data Types", "Control Flow", "Functions", "DOM Manipulation"],
      },
    ],
  },
  {
    id: 2,
    slug: "react-masterclass",
    title: "React Masterclass",
    description: "Master React.js with hands-on projects and learn state management, hooks, and modern React patterns.",
    longDescription:
      "Take your React skills to the next level with our comprehensive masterclass. You'll learn advanced concepts like state management with Redux, custom hooks, and performance optimization. Through building real-world applications, you'll understand best practices and modern React patterns that are used in production applications.",
    hours: 30,
    image: "/placeholder.svg?height=400&width=800",
    modules: [
      {
        title: "React Fundamentals",
        lessons: ["Components and Props", "State and Lifecycle", "Event Handling", "Conditional Rendering"],
      },
      {
        title: "Advanced Concepts",
        lessons: ["Hooks in Depth", "Context API", "Error Boundaries", "Performance Optimization"],
      },
      {
        title: "State Management",
        lessons: ["Redux Fundamentals", "Redux Toolkit", "React Query", "Zustand"],
      },
    ],
  },
  {
    id: 3,
    slug: "full-stack-development",
    title: "Full Stack Development",
    description:
      "Become a full-stack developer by learning both frontend and backend technologies, databases, and deployment.",
    longDescription:
      "This comprehensive course covers everything you need to become a full-stack developer. From frontend frameworks to backend APIs, databases, and deployment, you'll learn the entire web development stack. By the end of the course, you'll be able to build and deploy complete web applications from scratch.",
    hours: 45,
    image: "/placeholder.svg?height=400&width=800",
    modules: [
      {
        title: "Backend Development",
        lessons: ["Node.js Basics", "Express.js", "REST APIs", "Authentication"],
      },
      {
        title: "Database Management",
        lessons: ["SQL Fundamentals", "MongoDB", "Database Design", "ORM Tools"],
      },
      {
        title: "Deployment & DevOps",
        lessons: ["Git Version Control", "CI/CD Pipelines", "Cloud Deployment", "Monitoring"],
      },
    ],
  },
]

export default function Course() {
  const params = useParams();
  const course = courses.find((course) => course.slug === params.slug)

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
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-zinc-950">{course.title}</h1>
          <div className="flex items-center text-zinc-500 mb-6">
            <Clock className="h-4 w-4 mr-2" />
            <span>{course.hours} hours</span>
          </div>
          <p className="text-xl text-zinc-500 mb-8">{course.longDescription}</p>
          <Button size="lg" className="w-full sm:w-auto bg-zinc-900 text-white hover:bg-zinc-800">
            Enroll Now
          </Button>
        </div>
      </div>
      <Card className="border-zinc-200 bg-white/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-zinc-950">Course Content</h2>
          <div className="space-y-6">
            {course.modules.map((module, index) => (
              <div key={index}>
                <h3 className="font-medium mb-2 text-zinc-900">{module.title}</h3>
                <ul className="space-y-2">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <li key={lessonIndex} className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-zinc-900 shrink-0" />
                      <span className="text-zinc-500">{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

