import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useBlog } from "../BlogContext"
import { Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ArticleList({ onViewArticle }) {
  const { articles, loading, error } = useBlog()

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p className="text-muted-foreground mt-4">Loading articles...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-2">Error loading articles: {error}</p>
        <p className="text-muted-foreground">Showing locally saved articles only.</p>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No articles yet. Create your first article!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Latest Articles</h2>
      <div className="grid gap-4">
        {articles.map((article) => (
          <Card key={article.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="line-clamp-2 flex-1">{article.title}</CardTitle>
                {article.source === "api" && (
                  <Badge variant="outline" className="ml-2 text-xs">
                    API
                  </Badge>
                )}
              </div>
              <CardDescription className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(article.createdAt)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3 mb-4">{article.content}</p>
              <Button onClick={() => onViewArticle(article.id)}>Read More</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
