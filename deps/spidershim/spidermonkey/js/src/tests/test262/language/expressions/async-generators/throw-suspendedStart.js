// Copyright 2017 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
author: Caitlin Potter <caitp@igalia.com>
esid: pending
description: >
  AsyncGeneratorResumeNext:
  If completion.[[Type]] is throw, and generator.[[AsyncGeneratorState]] is
  "suspendedStart", generator is closed without being resumed.
flags: [async]
---*/

var error = new Error('boop');
var g = async function*() {
  throw new Test262Error('Generator must not be resumed.');
};

var it = g();
it.throw(error).then($DONE, function(err) {
  assert.sameValue(err, error, 'AsyncGeneratorReject(generator, completion.[[Value]])');

  it.next().then(function(ret) {
    assert.sameValue(ret.value, undefined, 'Generator is closed');
    assert.sameValue(ret.done, true, 'Generator is closed');
  }).then($DONE, $DONE);
}).catch($DONE);
