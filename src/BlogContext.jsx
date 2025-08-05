import { createContext, useContext, useEffect, useState } from "react"

const BlogContext = createContext(undefined)

export function BlogProvider({ children }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load articles from API and localStorage on mount
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch 5 posts from DummyJSON API
        const response = await fetch("https://dummyjson.com/posts?limit=5")
        if (!response.ok) {
          throw new Error("Failed to fetch posts")
        }

        const data = await response.json()

        // Transform API posts to match our article structure
        const apiArticles = data.posts.map((post) => ({
          id: post.id.toString(),
          title: post.title,
          content: post.body,
          createdAt: new Date().toISOString(), // API doesn't provide dates, so use current time
          source: "api", // Mark as API posts
        }))

        // Load user-created articles from localStorage
        const savedArticles = localStorage.getItem("blog-articles")
        const userArticles = savedArticles ? JSON.parse(savedArticles) : []

        // Combine API articles with user articles (user articles first)
        const allArticles = [...userArticles, ...apiArticles]
        setArticles(allArticles)
      } catch (err) {
        setError(err.message)
        console.error("Error fetching posts:", err)

        // Fallback to localStorage only if API fails
        const savedArticles = localStorage.getItem("blog-articles")
        if (savedArticles) {
          setArticles(JSON.parse(savedArticles))
        }
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [])

  // Save only user-created articles to localStorage (not API articles)
  useEffect(() => {
    const userArticles = articles.filter((article) => article.source !== "api")
    if (userArticles.length > 0) {
      localStorage.setItem("blog-articles", JSON.stringify(userArticles))
    }
  }, [articles])

  const addArticle = (articleData) => {
    const newArticle = {
      ...articleData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      source: "user", // Mark as user-created
    }
    setArticles((prev) => [newArticle, ...prev])
  }

  const getArticle = (id) => {
    return articles.find((article) => article.id === id)
  }

  return (
    <BlogContext.Provider value={{ articles, addArticle, getArticle, loading, error }}>{children}</BlogContext.Provider>
  )
}

export function useBlog() {
  const context = useContext(BlogContext)
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider")
  }
  return context
}