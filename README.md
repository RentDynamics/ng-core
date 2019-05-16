
[![Circle CI Badge][circleci-badge]][circleci-link]
[![codecov][codecov-image]][codecov-link]
[![Dependency Status][dependency-image]][dependency-link]
[![Dev Dependency Status][dev-dependency-image]][dev-dependency-link]
[![Peer Dependency Status][peer-dependency-image]][peer-dependency-link]
[![NPM Downloads][npm-downloads-image]][npm-downloads-link]
[![NPM Version][npm-version-image]][npm-version-link]
[![MIT License][npm-license-image]][npm-license-link]

## @rd/core [![Public or Private Repo][public-true-image]][public-true-link]

<!--[![Build Status](https://travis-ci.org/ng2select/bootstrap.svg?branch=master)](https://travis-ci.org/ng2select/bootstrap)-->

## @rd/core@3.x

#### this module contains any javascript code that is essential to every application.
it is reliant on the @angular/core, @angular/common modules. this module contains, but is not limited to, base classes, etc of which are core to any front-end javascript architecture.

http://rd.github.io

## installation

```
npm install @rd/core jssha --save

```

## how to import

```TypeScript  

import { RdAngularCoreModule } from '@rd/core';

```

## examples

### OrderByObjectPipe
```
*ngFor="let client of clients | async | orderByObject: ['name']"

```
or
```
*ngFor="let client of clients | async | orderByObject: ['-name']"

```

<!-- <iframe src="http://embed.plnkr.co/GeHGKI/?show=preview" frameborder="0" width="100%" height="500"></iframe> -->

_powered by:_
https://rentdynamics.com +
https://angular.io

## release

In order to release this package automatically, you must format the commit message properly so that when it is merged into master, it will semantically release the new changes based on commit msg type and previously tagged version

Don't forget to expose any new additions publically, ensure everything is accessible via the public_api.ts


[Code review guidelines for this project](CODE_REVIEWS.md)

[Coding standards for this project](CODING_STANDARDS.md)

[Contribution guidelines for this project](CONTRIBUTING.md)


[npm-icon]: https://nodei.co/npm/@rd/core.svg?downloads=true
[npm-icon-link]: https://npmjs.org/package/@rd/core
[circleci-badge]: https://circleci.com/gh/RentDynamics/ng-core.svg?style=shield
[circleci-link]: https://circleci.com/gh/rentdynamics/ng-core/tree/master
[codecov-image]: https://codecov.io/gh/RentDynamics/ng-core/branch/master/graph/badge.svg
[codecov-link]: https://codecov.io/gh/RentDynamics/ng-core
[nsp-image]: https://nodesecurity.io/orgs/rent-dynamics/projects/0b73ffc7-507b-4b70-ae71-035315f28a2e/badge
[nsp-link]: https://nodesecurity.io/orgs/rent-dynamics/projects/0b73ffc7-507b-4b70-ae71-035315f28a2e
[dependency-image]: https://david-dm.org/RentDynamics/ng-core/status.svg
[dependency-link]: https://david-dm.org/RentDynamics/ng-core
[dev-dependency-image]: https://david-dm.org/RentDynamics/ng-core/dev-status.svg
[dev-dependency-link]: https://david-dm.org/RentDynamics/ng-core?type=dev
[peer-dependency-image]: https://david-dm.org/RentDynamics/ng-core/peer-status.svg
[peer-dependency-link]: https://david-dm.org/RentDynamics/ng-core?type=peer
[public-true-image]: https://img.shields.io/badge/public-true-yellow.svg
[public-true-link]: https://img.shields.io/badge/public-true-yellow.svg
[private-true-image]: https://img.shields.io/badge/private-true-green.svg
[private-true-link]: https://img.shields.io/badge/private-true-green.svg
[npm-version-image]: https://img.shields.io/npm/v/@rd/core.svg
[npm-version-link]: https://www.npmjs.com/package/@rd/core
[npm-downloads-image]: https://img.shields.io/npm/dm/@rd/core.svg
[npm-downloads-link]: http://npm-stat.com/charts.html?package=@rd/core&from=2018-03-01
[npm-license-image]: https://img.shields.io/npm/l/@rd/core.svg
[npm-license-link]: LICENSE
[license-link]: http://opensource.org/licenses/MIT
