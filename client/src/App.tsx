import { useState } from 'react'
import { Link } from 'react-router'

import { Clock } from 'lucide-react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './components/ui/card'
import placeholderImg from './assets/placeholder.svg'

const courses = [
  {
    id: 1,
    slug: "web-development-fundamentals",
    title: "Web Development Fundamentals",
    description: "Learn the core concepts of web development, including HTML, CSS, and JavaScript. Perfect for beginners starting their coding journey.",
    hours: 20,
    instructor: "Bob Smith",
    category: "Web Development",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    slug: "react-masterclass",
    title: "React Masterclass",
    description: "Master React.js with hands-on projects and learn state management, hooks, and modern React patterns.",
    hours: 30,
    instructor: "Alice Johnson",
    category: "Web Development",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    slug: "full-stack-development",
    title: "Full Stack Development",
    description: "Become a full-stack developer by learning both frontend and backend technologies, databases, and deployment.",
    hours: 45,
    instructor: "Charlie Brown",
    category: "Web Development",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    slug: "python-for-data-science",
    title: "Python for Data Science",
    description: "Learn Python programming and data science libraries such as NumPy, Pandas, and Matplotlib for data analysis and visualization.",
    hours: 25,
    instructor: "Eve Wilson",
    category: "Data Science",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    slug: "machine-learning-101",
    title: "Machine Learning 101",
    description: "Get started with machine learning by learning the basics of supervised and unsupervised learning, regression, and classification.",
    hours: 35,
    instructor: "Frank Miller",
    category: "Data Science",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 6,
    slug: "deep-learning-foundations",
    title: "Deep Learning Foundations",
    description: "Dive deep into neural networks, convolutional neural networks, and recurrent neural networks for deep learning applications.",
    hours: 40,
    instructor: "Grace Davis",
    category: "Data Science",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 7,
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description: "Learn the principles of user interface and user experience design, wireframing, prototyping, and usability testing.",
    hours: 15,
    instructor: "Henry Lee",
    category: "Design",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 8,
    slug: "graphic-design-101",
    title: "Graphic Design 101",
    description: "Master graphic design tools such as Adobe Photoshop, Illustrator, and InDesign, and learn design principles and typography.",
    hours: 20,
    instructor: "Ivy Clark",
    category: "Design",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 9,
    slug: "digital-marketing-fundamentals",
    title: "Digital Marketing Fundamentals",
    description: "Learn the core concepts of digital marketing, including SEO, SEM, social media marketing, and email marketing.",
    hours: 10,
    instructor: "Jack White",
    category: "Marketing",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 10,
    slug: "content-marketing-strategy",
    title: "Content Marketing Strategy",
    description: "Develop a content marketing strategy, create engaging content, and learn how to measure content performance.",
    hours: 15,
    instructor: "Kate Brown",
    category: "Marketing",
    image: "/placeholder.svg?height=200&width=400",
  },
]

function App() {

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]" />
      <main className="mx-auto max-w-7xl sm:px-6 lg:px-8 relative py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-zinc-950">Featured Courses</h1>
          <p className="text-xl text-zinc-500">Expand your knowledge with our comprehensive courses</p>
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
                <CardTitle className="mb-2 line-clamp-1 text-zinc-950">{course.title}</CardTitle>
                <p className="text-zinc-500 line-clamp-3 mb-4">{course.description}</p>
                <div className="flex items-center text-zinc-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{course.hours} hours</span>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full bg-zinc-900 text-white hover:bg-zinc-800">
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
