import { useState } from "react"
import { BlogProvider } from "./BlogContext"
import { ArticleList } from "./components/ArticleList"
import { ArticleDetail } from "./components/ArticleDetail"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, PenTool, Home } from "lucide-react"

export default function App() {
  const [currentView, setCurrentView] = useState("list")
  const [selectedArticleId, setSelectedArticleId] = useState("")

  const handleViewArticle = (id) => {
    setSelectedArticleId(id)
    setCurrentView("detail")
  }

  const handleBackToList = () => {
    setCurrentView("list")
    setSelectedArticleId("")
  }

  return (
    <BlogProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">SimpleBlog</h1>
                <p className="text-gray-600 mt-1">Share your thoughts with the world</p>
              </div>
              {currentView !== "list" && (
                <Button onClick={handleBackToList} variant="outline">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              )}
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          {currentView === "list" && (
            <Tabs defaultValue="articles" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="articles" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Articles
                </TabsTrigger>
                <TabsTrigger value="create" className="flex items-center gap-2">
                  <PenTool className="h-4 w-4" />
                  Write Article
                </TabsTrigger>
              </TabsList>

              <TabsContent value="articles">
                <ArticleList onViewArticle={handleViewArticle} />
              </TabsContent>
              
            </Tabs>
          )}

  {currentView === "detail" && <ArticleDetail articleId={selectedArticleId} onBack={handleBackToList} />}
        </main>

        <footer className="bg-white border-t mt-16">
          <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-600">
            <p>@copyright-2025 SimpleBlog</p>
          </div>
        </footer>
      </div>
    </BlogProvider>
  )
}
