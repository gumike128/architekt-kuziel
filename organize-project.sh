#!/bin/bash

# Navigating to the root directory
cd architekt-kuziel

# Creating the directory structure
mkdir -p src/frontend/components/{AI,ContentStudio,Dashboard,Integration,Layout,MindFinder,UniversalPrompt}
mkdir -p src/frontend/{contexts,hooks,pages,public,services,store/slices,styles,utils,__tests__}
mkdir -p src/backend/{config,middleware,models,routes,schema,services,utils}
mkdir -p src/shared/types
mkdir -p {scripts,docs,deployment-web}

# Moving frontend-related React/Next.js files
# Components
mv AISuggestion.js ContextAnalyzerComponent.jsx PatternRecognizerComponent.jsx PredictiveEngineComponent.jsx SemanticTaggerComponent.jsx ContentGeneratorComponent.jsx src/frontend/components/AI/
mv ContentCreationStudio.tsx EnhancedContentCreationStudio.jsx EnhancedContentCreationStudio.test.js Content.js src/frontend/components/ContentStudio/
mv AdaptiveDashboard.tsx DashboardWidget.js DashboardWidget.tsx EnhancedAdaptiveDashboard.jsx EnhancedAdaptiveDashboard.test.js IntegratedDashboard.jsx src/frontend/components/Dashboard/
mv MainLayout.js MainLayout.tsx EnhancedMainLayout.jsx EnhancedMainLayout.test.js Header.tsx EnhancedFooter.jsx EnhancedFooter.test.js EnhancedSidebar.jsx EnhancedSidebar.test.js Sidebar.tsx src/frontend/components/Layout/
mv MindFinderNavigator.tsx EnhancedMindFinderNavigator.jsx EnhancedMindFinderNavigator.test.js src/frontend/components/MindFinder/
mv UniversalPrompt.js UniversalPrompt.tsx EnhancedUniversalPrompt.jsx EnhancedUniversalPrompt.test.js src/frontend/components/UniversalPrompt/

# Contexts
mv AIContext.js AuthContext.js ContentContext.js DashboardContext.js AppProvider.js src/frontend/contexts/

# Pages
mv _app.js _app.tsx index.js index.ts index.tsx login.js login.tsx register.js register.tsx dashboard.js dashboard.tsx content.tsx create.tsx welcome.tsx src/frontend/pages/

# Store
mv authSlice.ts reduxHooks.ts src/frontend/store/slices/

# Styles
mv globals.css tailwind.config.js src/frontend/styles/

# Config
mv next.config.js webpack.assets.js webpack.prod.js src/frontend/

# Backend files
mv server.js aiRoutes.js enhancedAiRoutes.js api.js src/backend/routes/
mv aiService.js enhancedAiService.js src/backend/services/
mv aiUtils.js auth.js optimize.js optimization.js src/backend/utils/
mv resolvers.js src/backend/schema/resolvers.js
mv typeDefs.js src/backend/schema/typeDefs.js
mv migrate.js User.js Tag.js Widget.js src/backend/models/

# Shared types
mv User.js Tag.js src/shared/types/ 2>/dev/null || true

# Scripts
mv prepare-deployment.js prepare-deployment.sh scripts/

# Documentation
mv README.md AI_ANALYSIS.md AI_ENHANCEMENT_PROPOSAL.md AI_FEATURES_DOCUMENTATION.md AI_FEATURES_DOCUMENTATION_WITH_GROQ.md DEPLOYMENT_INSTRUCTIONS.md DEVELOPER_DOCUMENTATION.md FINAL_REPORT.md GITHUB_MIGRATION_GUIDE.md LOCAL_INSTALLATION.md USER_DOCUMENTATION.md analyza.md analyza_poziadaviek.md architektura_systemu.md deployment_requirements.md dizajnove_principy.md konceptualny_navrh_carovnej_aplikacie.md konsolidovany_navrh.md pouzivatelske_scenare.md produkcny_plan.md ramec_merania_uspechu.md technologicke_uvahy.md todo.md docs/

# Deployment
mv Dockerfile docker-compose.yml deployment-web/

# Handle root package.json and tsconfig.json - make copies
cp package.json tsconfig.json ./
mv package.json src/frontend/
cp package.json src/backend/

# Create .env files in backend
touch src/backend/.env
touch src/backend/.env.example

echo "Directory structure created and files moved successfully!"