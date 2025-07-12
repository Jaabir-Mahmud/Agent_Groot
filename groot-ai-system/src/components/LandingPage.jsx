import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Brain, Network, TreePine, Zap, Users, Code, Search, FileText, Settings, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import aiNetworkImg from '../assets/ai-network.jpg';
import multiAgentImg from '../assets/multi-agent-system.png';
import treeGrowthImg from '../assets/tree-growth.jpg';
import techTreeImg from '../assets/tech-tree.jpg';

const LandingPage = () => {
  const navigate = useNavigate();
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const features = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Information Retrieval",
      description: "Agents capable of searching, summarizing, and synthesizing information from various sources with intelligent filtering."
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Content Generation",
      description: "AI agents that can draft emails, reports, creative writing, or code snippets tailored to your specific needs."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Task Automation",
      description: "Intelligent agents designed to automate routine digital tasks like scheduling, data entry, and workflow management."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Collaborative Problem Solving",
      description: "Multiple agents work together to solve complex problems that a single AI might struggle with independently."
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Customizable Agents",
      description: "Configure and customize agents to match your specific workflow requirements and preferences."
    },
    {
      icon: <Network className="h-8 w-8" />,
      title: "Multi-Agent Coordination",
      description: "Seamless communication and coordination between different specialized agents for optimal task execution."
    }
  ];

  const useCases = [
    {
      title: "For Students",
      description: "Research assistance, essay writing, study planning, and academic project management.",
      icon: "🎓"
    },
    {
      title: "For Researchers",
      description: "Literature review, data analysis, hypothesis generation, and research documentation.",
      icon: "🔬"
    },
    {
      title: "For Content Creators",
      description: "Content ideation, writing assistance, social media management, and creative brainstorming.",
      icon: "✍️"
    },
    {
      title: "For Small Businesses",
      description: "Customer service automation, marketing content, business planning, and operational efficiency.",
      icon: "🏢"
    }
  ];

  const techStack = [
    { name: "React.js", color: "bg-blue-100 text-blue-800" },
    { name: "Tailwind CSS", color: "bg-cyan-100 text-cyan-800" },
    { name: "Python", color: "bg-yellow-100 text-yellow-800" },
    { name: "FastAPI", color: "bg-green-100 text-green-800" },
    { name: "PyTorch", color: "bg-orange-100 text-orange-800" },
    { name: "Hugging Face", color: "bg-purple-100 text-purple-800" }
  ];

  const benefits = [
    "Increased productivity through intelligent automation",
    "Reduced time on repetitive tasks",
    "Enhanced decision-making with AI insights",
    "Scalable solution that grows with your needs",
    "Open-source and cost-effective approach",
    "Optimized for consumer-grade hardware"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-green-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <TreePine className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">Groot</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-green-600 transition-colors">How it Works</a>
              <a href="#use-cases" className="text-gray-600 hover:text-green-600 transition-colors">Use Cases</a>
              <a href="#tech-stack" className="text-gray-600 hover:text-green-600 transition-colors">Technology</a>
            </div>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => navigate('/groot')}>
              Launch Groot <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
                Multi-Agent AI System
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
              variants={fadeInUp}
            >
              Groot: Your Collaborative
              <span className="text-green-600 block">AI Assistant</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Unleash the power of intelligent agents working together to simplify your tasks. 
              Experience the future of AI collaboration with our modular, open-source multi-agent system.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={fadeInUp}
            >
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3" onClick={() => navigate('/groot')}>
                Launch Groot <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 border-green-200 hover:bg-green-50">
                Explore Agents
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            className="mt-16 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={aiNetworkImg} 
                alt="AI Network Visualization" 
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Intelligent Agent Network</h3>
                <p className="text-green-200">Visualizing AI collaboration in action</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                What is Groot?
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Groot is a revolutionary multi-agent AI system that brings together specialized AI agents 
                to work collaboratively on complex tasks. Unlike traditional single-AI solutions, Groot 
                leverages the power of multiple intelligent agents, each with unique capabilities, 
                working in harmony to deliver superior results.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Built with modularity at its core, Groot allows for easy expansion and customization. 
                The system is optimized for consumer-grade hardware while maintaining enterprise-level 
                capabilities, making advanced AI accessible to everyone.
              </p>
              
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center space-x-3"
                    variants={fadeInUp}
                  >
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <img 
                src={multiAgentImg} 
                alt="Multi-Agent System Architecture" 
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Groot Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A simplified overview of our multi-agent architecture and collaborative workflow
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Card className="h-full border-green-200 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Task Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Groot analyzes your request and determines which specialized agents 
                    are best suited for the task at hand.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full border-green-200 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Network className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Agent Coordination</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Multiple agents collaborate, sharing information and coordinating 
                    their efforts to tackle different aspects of your task.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full border-green-200 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Result Synthesis</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    The agents combine their outputs into a comprehensive, 
                    high-quality result that exceeds what any single AI could achieve.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the capabilities that make Groot your ultimate AI companion
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow border-gray-200 hover:border-green-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-green-600">{feature.icon}</div>
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Use Cases</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how Groot can transform your workflow across different domains
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {useCases.map((useCase, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full text-center hover:shadow-lg transition-shadow border-green-200">
                  <CardHeader>
                    <div className="text-4xl mb-4">{useCase.icon}</div>
                    <CardTitle className="text-xl">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{useCase.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section id="tech-stack" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Built with Modern Technology</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powered by cutting-edge, open-source technologies for reliability and performance
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {techStack.map((tech, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Badge className={`text-lg px-4 py-2 ${tech.color}`}>
                  {tech.name}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <img 
                src={techTreeImg} 
                alt="Technology Tree" 
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Optimized for Consumer Hardware
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Groot is specifically designed to run efficiently on consumer-grade hardware, 
                including systems with limited VRAM (4GB RTX 3050Ti). We achieve this through 
                advanced optimization techniques including model quantization, CPU offloading, 
                and intelligent resource management.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our commitment to open-source technologies ensures that Groot remains accessible, 
                transparent, and continuously improving through community contributions.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Experience the Future of AI?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join the revolution of collaborative AI and discover what multiple intelligent 
              agents can accomplish together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3" onClick={() => navigate('/groot')}>
                Launch Groot <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-3">
                View Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <TreePine className="h-8 w-8 text-green-400" />
                <span className="text-2xl font-bold">Groot</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Empowering the future with collaborative multi-agent AI systems. 
                Open-source, efficient, and designed for everyone.
              </p>
              <div className="flex space-x-4">
                <Badge className="bg-green-600 hover:bg-green-700">Open Source</Badge>
                <Badge className="bg-blue-600 hover:bg-blue-700">Community Driven</Badge>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-green-400 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-green-400 transition-colors">How it Works</a></li>
                <li><a href="#use-cases" className="hover:text-green-400 transition-colors">Use Cases</a></li>
                <li><a href="#tech-stack" className="hover:text-green-400 transition-colors">Technology</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Groot Multi-Agent AI System. Built with ❤️ for the open-source community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

