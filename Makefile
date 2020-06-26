
.PHONY: help clean

help:
	@echo ======================================================================================
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'
	@echo ======================================================================================


clean:		## remove generated files
	find . -name 'dist' | xargs rm -rf
	find . -name 'node_modules' | xargs rm -rf


version:	## update version
	@yarn update-version


publish:	## publish to npm
	@npm run publish-all