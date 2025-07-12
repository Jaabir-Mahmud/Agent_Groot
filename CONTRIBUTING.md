# Contributing to GROOT Agent

Thank you for your interest in contributing to the GROOT Multi-Agent AI System! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues
- Use the GitHub issue tracker
- Provide detailed descriptions of the problem
- Include steps to reproduce the issue
- Mention your operating system and environment

### Suggesting Features
- Open a new issue with the "enhancement" label
- Describe the feature and its benefits
- Provide use cases and examples

### Code Contributions
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Submit a pull request

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ and pnpm (or npm)
- Python 3.11+
- Git

### Local Development
1. Clone your fork:
   ```bash
   git clone https://github.com/your-username/GROOTAgent.git
   cd GROOTAgent
   ```

2. Set up the backend:
   ```bash
   cd groot-backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Set up the frontend:
   ```bash
   cd ../groot-ai-system
   pnpm install  # or npm install
   ```

4. Start development servers:
   ```bash
   # Terminal 1 - Backend
   cd groot-backend
   source venv/bin/activate
   python src/main.py

   # Terminal 2 - Frontend
   cd groot-ai-system
   pnpm run dev
   ```

## 📝 Code Style Guidelines

### Python (Backend)
- Follow PEP 8 style guide
- Use meaningful variable and function names
- Add docstrings to functions and classes
- Keep functions small and focused
- Use type hints where appropriate

### JavaScript/React (Frontend)
- Use consistent indentation (2 spaces)
- Follow ESLint configuration
- Use meaningful component and variable names
- Keep components small and focused
- Use functional components with hooks

### Git Commit Messages
- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove, etc.)
- Keep the first line under 50 characters
- Add more details in the body if needed

## 🧪 Testing

### Backend Testing
```bash
cd groot-backend
source venv/bin/activate
python -m pytest  # if pytest is configured
```

### Frontend Testing
```bash
cd groot-ai-system
pnpm run test  # if testing framework is configured
```

## 📚 Documentation

- Update README.md if you add new features
- Add comments to complex code sections
- Update API documentation if endpoints change
- Include examples for new features

## 🔒 Security

- Never commit sensitive information (API keys, passwords)
- Use environment variables for configuration
- Validate all user inputs
- Follow security best practices

## 🚀 Pull Request Process

1. Ensure your code follows the style guidelines
2. Test your changes thoroughly
3. Update documentation as needed
4. Make sure all tests pass
5. Provide a clear description of your changes
6. Reference any related issues

## 📞 Getting Help

- Check existing issues and pull requests
- Join discussions in the issue tracker
- Ask questions in the issues section

## 🎉 Recognition

Contributors will be recognized in:
- The project README
- Release notes
- GitHub contributors page

Thank you for contributing to GROOT Agent! 🌱 