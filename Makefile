up: ## run the project
	npm run dev

build: ## Build the frontend
	npm install

dist: ## Generate the build in dist dir
	npm run build

surge: ## Serve with surge
	npx surge dist ohyash-everything-dev.surge.sh
