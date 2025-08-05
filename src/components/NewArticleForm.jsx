import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Alert, AlertDescription } from "./ui/alert"
import { useBlog } from "../BlogContext"
import { useState } from "react"
import { CheckCircle, AlertCircle } from "lucide-react"

const articleSchema = z.object({
  title: z.string().min(1, "Title is required").min(3, "Title must be at least 3 characters"),
  content: z.string().min(1, "Content is required").min(10, "Content must be at least 10 characters"),
})

export function NewArticleForm() {
  const { addArticle } = useBlog()
  const [submitStatus, setSubmitStatus] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(articleSchema),
  })

  const onSubmit = async (data) => {
    try {
      setSubmitStatus(null)
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      addArticle(data)
      setSubmitStatus("success")
      reset()

      // Clear success message after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000)
    } catch (error) {
      setSubmitStatus("error")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Article</CardTitle>
        <CardDescription>
          Share your thoughts with the world. Fill out the form below to publish a new article.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter article title..."
              {...register("title")}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your article content here..."
              rows={8}
              {...register("content")}
              className={errors.content ? "border-red-500" : ""}
            />
            {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Publishing..." : "Publish Article"}
          </Button>
        </form>

        {submitStatus === "success" && (
          <Alert className="mt-4 border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">Article published successfully!</AlertDescription>
          </Alert>
        )}

        {submitStatus === "error" && (
          <Alert className="mt-4 border-red-500 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">Failed to publish article. Please try again.</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}