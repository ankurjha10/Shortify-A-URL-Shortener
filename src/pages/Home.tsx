import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Link2, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import API from "@/api";

const Home = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleShorten = async () => {
    if (!originalUrl) {
      toast({
        title: "Error",
        description: "Please enter a URL to shorten",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await API.post(
        `/url/shortUrl?originalUrl=${encodeURIComponent(originalUrl)}`
      );
      setShortUrl(response.data.shortURL || response.data.shortUrl || response.data);
      toast({
        title: "Success!",
        description: "Your URL has been shortened",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to shorten URL. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Short URL copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };


  return (
    <div className="min-h-screen bg-gradient-background flex flex-col">
      <div className="container mx-auto px-4 py-12 flex-1">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent"
          >
            Shorten Your Links
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Create short, memorable links in seconds. Track clicks and manage
            your URLs with ease.
          </motion.p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-hover transition-all">
            <Link2 className="w-8 h-8 text-primary mb-3" />
            <p className="text-3xl font-bold mb-1">10K+</p>
            <p className="text-sm text-muted-foreground">Links Shortened</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-hover transition-all">
            <TrendingUp className="w-8 h-8 text-primary mb-3" />
            <p className="text-3xl font-bold mb-1">50K+</p>
            <p className="text-sm text-muted-foreground">Total Clicks</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-hover transition-all">
            <Zap className="w-8 h-8 text-primary mb-3" />
            <p className="text-3xl font-bold mb-1">Fast</p>
            <p className="text-sm text-muted-foreground">Lightning Speed</p>
          </div>
        </motion.div>

        {/* URL Shortener Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto bg-card rounded-2xl p-8 shadow-card"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Enter your long URL
              </label>
              <Input
                type="url"
                placeholder="https://example.com/very-long-url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="h-12 text-base"
                onKeyDown={(e) => e.key === "Enter" && handleShorten()}
              />
            </div>

            <Button
              onClick={handleShorten}
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              {isLoading ? "Shortening..." : "Shorten URL"}
            </Button>

            {shortUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-muted rounded-lg border border-border"
              >
                <p className="text-sm text-muted-foreground mb-2">
                  Your shortened URL:
                </p>
                <div className="flex gap-2 items-center">
                  <Input
                    value={shortUrl}
                    readOnly
                    className="flex-1 font-mono"
                  />
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Link2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
            <p className="text-muted-foreground">
              Simply paste your URL and get a short link instantly
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Track Analytics</h3>
            <p className="text-muted-foreground">
              Monitor clicks and engagement on your shortened links
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
