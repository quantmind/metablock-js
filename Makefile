
.PHONY: help clean

help:
	@echo ======================================================================================
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'
	@echo ======================================================================================


clean:		## remove generated files
	@rm -rf packages/metablock-core/dist
	@rm -rf packages/metablock-cli/dist
	@rm -rf packages/metablock-store/dist
	@rm -rf packages/metablock-react/dist


version:	## update version
	@yarn update-version


publish:	## publish to npm
	@npm run publish-all
