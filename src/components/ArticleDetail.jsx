import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { useBlog } from "../BlogContext"
import { ArrowLeft, Calendar } from "lucide-react"

export function ArticleDetail({ articleId, onBack }) {
  const { getArticle } = useBlog()
  const [article, setArticle] = useState(undefined)

  useEffect(() => {
    const foundArticle = getArticle(articleId)
    setArticle(foundArticle)
  }, [articleId, getArticle])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!article) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Article not found.</p>
        <Button onClick={onBack} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Articles
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Button onClick={onBack} variant="outline">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Articles
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{article.title}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(article.createdAt)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray max-w-none">
            {article.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}