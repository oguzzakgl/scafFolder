import { agentBundle } from './agents-bundle.js';

export const projectTemplates = {
    'web-app': {
        folders: [
            'src/app/components/ui', 
            'src/app/components/layout', 
            'src/app/components/shared',
            'src/app/hooks', 
            'src/app/lib', 
            'src/app/types', 
            'src/app/styles',
            'public/images', 
            'public/fonts', 
            'tests/unit', 
            'tests/e2e',
            'project_context'
        ],
        files: [
            ...agentBundle,
            { path: 'src/app/layout.tsx', content: '// Root Layout' },
            { path: 'src/app/page.tsx', content: '// Home Page' },
            { path: 'src/app/globals.css', content: '/* Global Styles */' },
            { path: 'src/app/components/layout/Header.tsx', content: '// Header' },
            { path: 'src/app/components/layout/Footer.tsx', content: '// Footer' },
            { path: 'src/app/components/layout/Sidebar.tsx', content: '// Sidebar' },
            { path: 'src/app/lib/utils.ts', content: '// Utility functions' },
            { path: 'src/app/lib/api.ts', content: '// API client' },
            { path: 'src/app/types/index.ts', content: '// Global types' },
            { path: 'README.md', content: '# Web Application Project' }
        ]
    },
    'mobile-flutter': {
        folders: [
            'lib/config', 'lib/features/auth/data', 'lib/features/auth/domain', 'lib/features/auth/presentation',
            'lib/features/home', 'lib/features/settings', 'lib/core/network', 'lib/core/storage', 'lib/core/utils',
            'lib/shared/widgets', 'assets/images', 'assets/fonts', 'assets/icons', 'android', 'ios',
            'test/unit', 'test/widget', 'project_context'
        ],
        files: [
            ...agentBundle,
            { path: 'lib/main.dart', content: '// Flutter Main' },
            { path: 'lib/app.dart', content: '// App Root' },
            { path: 'lib/config/routes.dart', content: '// Router' },
            { path: 'lib/config/theme.dart', content: '// Theme Data' },
            { path: 'README.md', content: '# Flutter Mobile App' }
        ]
    },
    'full-stack': {
        folders: [
            'backend/src/controllers', 'backend/src/services', 'backend/src/models', 'backend/src/routes',
            'backend/src/middleware', 'backend/src/config', 'backend/tests/unit', 'backend/tests/integration',
            'frontend/src/app', 'frontend/src/components', 'frontend/src/hooks', 'frontend/src/lib', 'frontend/src/styles',
            'frontend/public', 'frontend/tests', 'database/migrations', 'database/seeds', 'docker', 'project_context'
        ],
        files: [
            ...agentBundle,
            { path: 'backend/src/app.ts', content: '// Express/Fastify App' },
            { path: 'database/schema.prisma', content: '// Prisma Schema' },
            { path: 'docker/Dockerfile.backend', content: '#' },
            { path: 'docker/Dockerfile.frontend', content: '#' },
            { path: 'docker/docker-compose.yml', content: 'version: "3.8"' },
            { path: 'README.md', content: '# Full Stack Project' }
        ]
    },
    'api-only': {
        folders: [
            'src/controllers', 'src/services', 'src/models', 'src/routes', 'src/middleware', 'src/config', 'src/utils',
            'tests/unit', 'tests/integration', 'docs', 'project_context'
        ],
        files: [
            ...agentBundle,
            { path: 'src/app.ts', content: '// API Server' },
            { path: 'docs/api-spec.yaml', content: '# OpenAPI Spec' },
            { path: '.env.example', content: 'PORT=3000' },
            { path: 'README.md', content: '# API Backend Only' }
        ]
    },
    'desktop-electron': {
        folders: [
            'src/main', 'src/renderer/app', 'src/renderer/components', 'src/renderer/styles', 'src/shared',
            'assets/icons', 'build', 'tests', 'project_context'
        ],
        files: [
            ...agentBundle,
            { path: 'src/main/index.ts', content: '// Electron Main Process' },
            { path: 'src/main/preload.ts', content: '// Preload Script' },
            { path: 'electron-builder.yml', content: '# Builder config' },
            { path: 'README.md', content: '# Electron Desktop App' }
        ]
    },
    'cli-tool': {
        folders: [
            'src/commands', 'src/utils', 'src/config', 'tests', 'bin', 'docs', 'project_context'
        ],
        files: [
            ...agentBundle,
            { path: 'src/index.ts', content: '// CLI Entry' },
            { path: 'bin/cli.js', content: '#!/usr/bin/env node' },
            { path: 'README.md', content: '# CLI Tool Project' }
        ]
    },
    'ai-ml': {
        folders: [
            'data/raw', 'data/processed', 'data/external', 'notebooks', 'src/data', 'src/features', 'src/models',
            'src/pipelines', 'src/serving', 'src/utils', 'configs', 'tests/unit', 'tests/integration',
            'models', 'mlruns', 'project_context'
        ],
        files: [
            ...agentBundle,
            { path: 'src/models/train.py', content: '# Training script' },
            { path: 'src/serving/api.py', content: '# Model API' },
            { path: 'requirements.txt', content: 'numpy\npandas\nscikit-learn' },
            { path: 'Dockerfile', content: 'FROM python:3.9' },
            { path: 'README.md', content: '# AI/ML Project Structure' }
        ]
    },
    'blockchain-web3': {
        folders: [
            'contracts/src/tokens', 'contracts/src/governance', 'contracts/src/utils', 'contracts/test',
            'contracts/scripts', 'frontend/src', 'backend/src', 'project_context'
        ],
        files: [
            ...agentBundle,
            { path: 'contracts/hardhat.config.ts', content: '// Hardhat Config' },
            { path: 'contracts/scripts/deploy.ts', content: '// Deployment Script' },
            { path: 'README.md', content: '# Blockchain/Web3 Project' }
        ]
    },
    'microservices': {
        folders: [
            'services/auth/src', 'services/gateway/src', 'services/orders/src', 'services/payments/src',
            'shared/lib', 'infrastructure/terraform', 'infrastructure/k8s', 'scripts', 'project_context'
        ],
        files: [
            ...agentBundle,
            { path: 'docker-compose.yml', content: 'version: "3.8"' },
            { path: 'README.md', content: '# Microservices Orchestration' }
        ]
    },
    'library-pkg': {
        folders: [
            'src', 'dist', 'examples', 'docs', 'tests', 'scripts', 'project_context'
        ],
        files: [
            ...agentBundle,
            { path: 'src/index.ts', content: '// Exported Library Logic' },
            { path: 'package.json', content: '{ "name": "my-library", "version": "1.0.0" }' },
            { path: 'README.md', content: '# Library/Package Project' }
        ]
    }
};
