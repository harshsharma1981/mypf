export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "SajjanSon Engineers Website",
    category: "Web Development",
    description: "A professional website for SajjanSon Engineers built with PHP Laravel and Nexelit CMS, featuring company services, projects, and contact information.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    technologies: ["PHP", "Laravel", "Nexelit CMS", "MySQL", "Bootstrap"],
    link: "https://sajjansonengineers.com"
  },
  {
    id: 2,
    title: "Deep Energy Website",
    category: "Web Development",
    description: "A modern energy company website built with React.js, Node.js, and Strapi CMS, featuring dynamic content management and interactive elements.",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    technologies: ["React.js", "Node.js", "Strapi CMS", "REST API", "Tailwind CSS"],
    link: "https://deepenergy.example.com",
    github: "https://github.com/yourusername/deep-energy"
  },
  {
    id: 3,
    title: "Real-Time Chatting App",
    category: "Full Stack Development",
    description: "A real-time messaging application with Socket.IO implementation, featuring instant messaging, user authentication, and chat rooms.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    technologies: ["MERN Stack", "Socket.IO", "JWT Authentication", "Redux", "Material UI"],
    github: "https://github.com/yourusername/chatting-app"
  },
  {
    id: 4,
    title: "Digital Diary Application",
    category: "Full Stack Development",
    description: "A personal diary application with rich text editing capabilities, mood tracking, and secure user accounts.",
    image: "https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    technologies: ["MERN Stack", "Quill.js", "JWT Authentication", "Mongoose", "React Router"],
    github: "https://github.com/yourusername/diary-app"
  },
  {
    id: 5,
    title: "HLinks URL Shortener",
    category: "Full Stack Development",
    description: "A custom URL shortening service with analytics dashboard, user accounts, and API access for developers.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
    technologies: ["MERN Stack", "JWT Authentication", "Chart.js", "REST API", "Bootstrap"],
    link: "https://hlinks.example.com",
    github: "https://github.com/yourusername/hlinks-app"
  },
  {
    id: 6,
    title: "Classic Snake Game",
    category: "Frontend Development",
    description: "A browser-based implementation of the classic Snake game with modern UI, score tracking, and difficulty levels.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    technologies: ["HTML5", "CSS3", "JavaScript", "Canvas API"],
    link: "https://yourusername.github.io/snake-game",
    github: "https://github.com/yourusername/snake-game"
  }
];