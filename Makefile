#############################
# Application Teritory
#############################
dev:
	npm run dev
prod:
	npm run start
build:
	npm run build

#############################
# Knex Database Teritory
#############################
kmake:
ifdef name
	npx knex --cwd src --knexfile knexfile migrate:make ${name}
endif

kmig:
ifdef type
	npx knex --cwd src --knexfile knexfile migrate:${type}
endif

klist:
	npx knex --cwd src --knexfile knexfile migrate:list