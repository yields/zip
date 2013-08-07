
scripts= $(wildcard lib/*.js)

build: components $(scripts)
	@component build

components: component.json
	@component install

clean:
	rm -fr build components template.js

.PHONY: clean
