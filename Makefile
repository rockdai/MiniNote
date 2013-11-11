TESTS = $(shell ls -S `find test -type f -name "*.test.js" -print`)
TIMEOUT = 30000
MOCHA_OPTS =
REPORTER = tap
NPM_INSTALL_PRODUCTION = PYTHON=`which python2.7` NODE_ENV=production npm install
NPM_INSTALL_TEST = PYTHON=`which python2.7` NODE_ENV=test npm install

install:
	@$(NPM_INSTALL_PRODUCTION)

install-test:
	@$(NPM_INSTALL_TEST)

test: install-test
	@NODE_ENV=test node_modules/mocha/bin/mocha \
		--bail --reporter $(REPORTER) --timeout $(TIMEOUT) $(MOCHA_OPTS) $(TESTS)

test-cov:
	@rm -f coverage.html
	@$(MAKE) test MOCHA_OPTS='--require blanket' REPORTER=html-cov > coverage.html
	@ls -lh coverage.html

test-all: test test-cov

clean:
	@rm -rf coverage.html node_modules

.PHONY: install install-test test test-cov clean
	