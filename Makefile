
.PHONY: help clean clean-deep version publish

help:
	@echo ======================================================================================
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'
	@echo ======================================================================================


clean:		## remove generated files
	find . -name 'dist' | xargs rm -rf
	find . -name 'esm' | xargs rm -rf

clean-deep:	## remove generated files & node_modules
	make clean
	rm -rf .yarn
	find . -name 'node_modules' | xargs rm -rf

publish:	## publish to npm
	@npm run publish-all

version:	## update version
	@yarn update-version

update:		## update dependencies
	@yarn upgrade --latest

outdated:	## outdated dependencies
	@yarn outdated


cloc:		## Count lines of code
	@cloc \
		--fullpath \
		--not-match-d=packages/.*/node-modules \
		--not-match-d=packages/.*/dist \
		packages
