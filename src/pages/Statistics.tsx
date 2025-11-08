import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BarChart3, Calendar, MousePointerClick, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import API from "@/api";

interface StatsData {
  originalUrl: string;
  shortCode: string;
  clickCount: number;
  createdAt: string;
}

const Statistics = () => {
  const [shortCode, setShortCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<StatsData | null>(null);
  const { toast } = useToast();

  const handleFetchStats = async () => {
    if (!shortCode) {
      toast({
        title: "Error",
        description: "Please enter a short code",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await API.get(`/stats/${shortCode}`);
      setStats(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch statistics. Please check the short code.",
        variant: "destructive",
      });
      setStats(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background flex flex-col">
      <div className="container mx-auto px-4 py-12 flex-1">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
              <BarChart3 className="w-8 h-8 text-primary-foreground" />
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Link Analytics
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track the performance of your shortened URLs with detailed statistics
          </p>
        </motion.div>

        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto bg-card rounded-2xl p-8 shadow-card mb-8"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Enter Short Code
              </label>
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="abc123"
                  value={shortCode}
                  onChange={(e) => setShortCode(e.target.value)}
                  className="flex-1 h-12 text-base"
                  onKeyDown={(e) => e.key === "Enter" && handleFetchStats()}
                />
                <Button
                  onClick={handleFetchStats}
                  disabled={isLoading}
                  className="h-12 px-8 bg-gradient-primary hover:opacity-90 transition-opacity"
                >
                  <Search className="w-5 h-5 mr-2" />
                  {isLoading ? "Loading..." : "Search"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Enter the short code from your shortened URL (e.g., "abc123" from shortify.com/abc123)
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Display */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-card rounded-2xl p-8 shadow-card">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-primary" />
                Statistics for {stats.shortCode}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-muted rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <MousePointerClick className="w-5 h-5 text-primary" />
                    <p className="text-sm font-medium text-muted-foreground">Total Clicks</p>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{stats.clickCount}</p>
                </div>

                <div className="bg-muted rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <p className="text-sm font-medium text-muted-foreground">Created Date</p>
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    {new Date(stats.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="bg-muted rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <ExternalLink className="w-5 h-5 text-primary" />
                    <p className="text-sm font-medium text-muted-foreground">Short Code</p>
                  </div>
                  <p className="text-lg font-semibold text-foreground font-mono">{stats.shortCode}</p>
                </div>
              </div>

              <div className="bg-muted rounded-xl p-6 border border-border">
                <p className="text-sm font-medium text-muted-foreground mb-2">Original URL</p>
                <div className="flex items-center gap-2">
                  <p className="text-foreground break-all flex-1">{stats.originalUrl}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(stats.originalUrl, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!stats && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto text-center py-12"
          >
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Statistics Yet</h3>
            <p className="text-muted-foreground">
              Enter a short code above to view detailed analytics
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Statistics;
