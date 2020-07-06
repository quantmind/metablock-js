
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
	find . -name 'node_modules' | xargs rm -rf


version:	## update version
	@yarn update-version


publish:	## publish to npm
	@npm run publish-all
