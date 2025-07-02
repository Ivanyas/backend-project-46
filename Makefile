install: #установить зависимости
	npm ci

gendiff:
	node bin/gendiff.js

publish: #публикация
	npm publish --dry-run

lint: #проверка линтером
	npx eslint .

test:
	npm test