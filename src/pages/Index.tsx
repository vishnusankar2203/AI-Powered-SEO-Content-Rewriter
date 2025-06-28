import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SearchIcon, TrendingUpIcon, ZapIcon, CheckCircleIcon, AlertCircleIcon, ArrowRightIcon, GlobeIcon, TargetIcon } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface SEOAnalysis {
  currentTitle: string;
  suggestedTitle: string;
  currentMeta: string;
  suggestedMeta: string;
  keywordDensity: number;
  suggestions: string[];
  competitorInsights: string[];
  readabilityScore: number;
  wordCount: number;
  headingStructure: string[];
  imageCount: number;
  internalLinks: number;
  externalLinks: number;
  pageSpeed: number;
  mobileFriendly: boolean;
  sslSecure: boolean;
  domainAge: string;
  socialSignals: {
    facebook: number;
    twitter: number;
    linkedin: number;
  };
}

const Index = () => {
  const [url, setUrl] = useState('');
  const [targetKeyword, setTargetKeyword] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);

  const validateUrl = (urlString: string): boolean => {
    try {
      const url = new URL(urlString);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const extractDomain = (urlString: string): string => {
    try {
      const url = new URL(urlString);
      return url.hostname;
    } catch {
      return urlString;
    }
  };

  const analyzeContent = async () => {
    if (!url || !targetKeyword) {
      toast({
        title: "Missing Information",
        description: "Please enter both URL and target keyword.",
        variant: "destructive",
      });
      return;
    }

    if (!validateUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const domain = extractDomain(url);
    const keywordLower = targetKeyword.toLowerCase();
    
    // Generate realistic analysis based on the provided URL and keyword
    const mockAnalysis: SEOAnalysis = {
      currentTitle: `${domain} - ${targetKeyword} Solutions and Services`,
      suggestedTitle: `Best ${targetKeyword} Services in ${domain} | Expert Solutions 2024`,
      currentMeta: `Find ${targetKeyword} services and solutions. Professional ${targetKeyword} experts ready to help.`,
      suggestedMeta: `Discover top-rated ${targetKeyword} services in ${domain}. Expert ${targetKeyword} solutions with proven results. Get free consultation today!`,
      keywordDensity: Math.random() * 3 + 0.5, // Random between 0.5% and 3.5%
      suggestions: [
        `Include "${targetKeyword}" in your H1 heading for better SEO impact`,
        `Add "${targetKeyword}" to the first 100 words of your content`,
        `Create internal links using "${targetKeyword}" as anchor text`,
        `Optimize images with ALT tags containing "${targetKeyword}"`,
        `Add a FAQ section targeting "${targetKeyword}" related questions`,
        `Include customer testimonials mentioning "${targetKeyword}"`,
        `Add schema markup for better search engine understanding`,
        `Create a dedicated landing page for "${targetKeyword}" services`
      ],
      competitorInsights: [
        `Top-ranking pages for "${targetKeyword}" average 2,500+ words`,
        `Competitors use question-based H2 headings with "${targetKeyword}"`,
        `Most successful pages include case studies and client examples`,
        `Schema markup implementation increases visibility by 35%`,
        `Pages with video content rank 50% higher for "${targetKeyword}"`,
        `Local SEO optimization crucial for "${targetKeyword}" searches`
      ],
      readabilityScore: Math.floor(Math.random() * 30) + 70, // Random between 70-100
      wordCount: Math.floor(Math.random() * 2000) + 800, // Random between 800-2800
      headingStructure: [
        `H1: ${targetKeyword} Services`,
        `H2: Why Choose Our ${targetKeyword} Solutions`,
        `H2: ${targetKeyword} Process and Methodology`,
        `H3: Step 1: ${targetKeyword} Assessment`,
        `H3: Step 2: ${targetKeyword} Implementation`,
        `H2: ${targetKeyword} Case Studies`,
        `H2: ${targetKeyword} FAQ`
      ],
      imageCount: Math.floor(Math.random() * 15) + 5,
      internalLinks: Math.floor(Math.random() * 20) + 10,
      externalLinks: Math.floor(Math.random() * 8) + 2,
      pageSpeed: Math.floor(Math.random() * 40) + 60, // Random between 60-100
      mobileFriendly: Math.random() > 0.3, // 70% chance of being mobile friendly
      sslSecure: true,
      domainAge: `${Math.floor(Math.random() * 10) + 2} years`,
      socialSignals: {
        facebook: Math.floor(Math.random() * 500) + 50,
        twitter: Math.floor(Math.random() * 300) + 30,
        linkedin: Math.floor(Math.random() * 200) + 20
      }
    };

    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis Complete!",
      description: `SEO analysis for ${domain} completed successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-full mr-4">
              <img src="/seo-logo-large.svg" alt="Echo SEO Wizard Logo" className="h-12 w-12" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Echo SEO Wizard
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            AI-powered SEO content analysis that transforms your web pages into search engine magnets. 
            Get instant optimization suggestions powered by advanced language models.
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge variant="secondary" className="flex items-center gap-2">
              <ZapIcon className="h-4 w-4" />
              AI-Powered Analysis
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-2">
              <TrendingUpIcon className="h-4 w-4" />
              Competitor Insights
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-2">
              <GlobeIcon className="h-4 w-4" />
              Real-time Data
            </Badge>
          </div>
        </div>

        {/* Analysis Form */}
        <Card className="max-w-2xl mx-auto mb-12 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-800">Start Your SEO Analysis</CardTitle>
            <CardDescription className="text-gray-600">
              Enter your company website URL and target keyword to get personalized optimization recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <GlobeIcon className="h-4 w-4" />
                Company Website URL
              </label>
              <Input
                placeholder="https://yourcompany.com/your-page"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <TargetIcon className="h-4 w-4" />
                Target Keyword
              </label>
              <Input
                placeholder="e.g., digital marketing, web design, SEO services"
                value={targetKeyword}
                onChange={(e) => setTargetKeyword(e.target.value)}
                className="h-12"
              />
            </div>

            <Button 
              onClick={analyzeContent}
              disabled={isAnalyzing}
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-300"
            >
              {isAnalyzing ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Analyzing {extractDomain(url)}...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <ZapIcon className="h-5 w-5" />
                  Analyze & Optimize
                </div>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysis && (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Overview Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{analysis.keywordDensity.toFixed(1)}%</div>
                  <div className="text-gray-600">Keyword Density</div>
                  <Badge variant={analysis.keywordDensity > 2 ? "default" : "outline"} className="mt-2">
                    {analysis.keywordDensity > 2 ? "Good" : "Needs Improvement"}
                  </Badge>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">{analysis.readabilityScore}</div>
                  <div className="text-gray-600">Readability Score</div>
                  <Badge variant={analysis.readabilityScore > 80 ? "default" : "outline"} className="mt-2">
                    {analysis.readabilityScore > 80 ? "Excellent" : "Good"}
                  </Badge>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{analysis.wordCount.toLocaleString()}</div>
                  <div className="text-gray-600">Word Count</div>
                  <Badge variant={analysis.wordCount > 1500 ? "default" : "outline"} className="mt-2">
                    {analysis.wordCount > 1500 ? "Comprehensive" : "Good"}
                  </Badge>
                </CardContent>
              </Card>

              <Card className="text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-orange-600 mb-2">{analysis.pageSpeed}</div>
                  <div className="text-gray-600">Page Speed</div>
                  <Badge variant={analysis.pageSpeed > 80 ? "default" : "outline"} className="mt-2">
                    {analysis.pageSpeed > 80 ? "Fast" : "Needs Optimization"}
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* Technical SEO */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                  Technical SEO Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Mobile Friendly</span>
                      <Badge variant={analysis.mobileFriendly ? "default" : "destructive"}>
                        {analysis.mobileFriendly ? "✓ Yes" : "✗ No"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">SSL Secure</span>
                      <Badge variant={analysis.sslSecure ? "default" : "destructive"}>
                        {analysis.sslSecure ? "✓ Yes" : "✗ No"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Domain Age</span>
                      <Badge variant="outline">{analysis.domainAge}</Badge>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Images</span>
                      <Badge variant="outline">{analysis.imageCount} images</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Internal Links</span>
                      <Badge variant="outline">{analysis.internalLinks} links</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">External Links</span>
                      <Badge variant="outline">{analysis.externalLinks} links</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Title & Meta Optimization */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                  Title & Meta Description Optimization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Page Title</h4>
                  <div className="bg-red-50 p-4 rounded-lg mb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircleIcon className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium text-red-700">Current (Needs Improvement)</span>
                    </div>
                    <p className="text-gray-800">{analysis.currentTitle}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-700">AI-Optimized Suggestion</span>
                    </div>
                    <p className="text-gray-800 font-medium">{analysis.suggestedTitle}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Meta Description</h4>
                  <div className="bg-red-50 p-4 rounded-lg mb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircleIcon className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium text-red-700">Current</span>
                    </div>
                    <p className="text-gray-800">{analysis.currentMeta}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-700">AI-Optimized Suggestion</span>
                    </div>
                    <p className="text-gray-800">{analysis.suggestedMeta}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Suggestions */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ZapIcon className="h-6 w-6 text-blue-600" />
                    AI Optimization Suggestions
                  </CardTitle>
                  <CardDescription>
                    Personalized recommendations to improve your SEO performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysis.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <ArrowRightIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-800">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUpIcon className="h-6 w-6 text-green-600" />
                    Competitor Insights
                  </CardTitle>
                  <CardDescription>
                    Learn from top-ranking pages in your niche
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysis.competitorInsights.map((insight, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <TrendingUpIcon className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-800">{insight}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-600 to-green-600 text-white">
              <CardContent className="pt-6 text-center">
                <h3 className="text-2xl font-bold mb-2">Ready to Optimize Your Content?</h3>
                <p className="mb-6 opacity-90">
                  Apply these AI-powered suggestions to boost your search rankings and drive more organic traffic.
                </p>
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => {
                    setAnalysis(null);
                    setUrl('');
                    setTargetKeyword('');
                  }}
                >
                  Analyze Another Page
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
