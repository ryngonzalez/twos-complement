function Binary(bitRepresentation) {
  this.bitArray = [];

  // Check if the representation is defined
  if (typeof bitRepresentation !== 'undefined') {
    // If so, set it.
    this.set(bitRepresentation);
  }
}

// Length property
Object.defineProperty(Binary.prototype, 'length', {
  get: function() { return this.bitArray.length; },
  set: function(length) { this.bitArray.length = length; },
  enumerable: true
});

// Print out binary number in a human readable way
Binary.prototype.print = function(opts) {
  console.log(this.toString(opts || {}));
};

Binary.prototype.toString = function(opts) {
  opts = opts || {withSpaces: false};
  var string = this.bitArray.reduce(function(prev, current, index) {
    return prev + (opts.withSpaces && ((index % 4) == 0) && index > 0 ? ' ' : '') + current;
  }, '');

  return string;
};

// Pre-condition: bitRepresentaition must be defined
Binary.prototype.set = function(bitRepresentation) {

  // Check if it's a string
  if (typeof bitRepresentation === 'string' || bitRepresentation instanceof String) {
    this.setBits(bitRepresentation);
  } else if (typeof bitRepresentation === 'number' || bitRepresentation instanceof Number) {
    this.setBits(bitRepresentation.toString(2))
  }
};

// Set binary from bit string
Binary.prototype.setBits = function (bitString) {
  // Iterate over the charactters in the string and convert it to bits
  for (var i = 0; i < bitString.length; i++) {
    if (bitString[i] == ' ') continue;
    var bit = parseInt(bitString[i], 10);
    this.bitArray.push(bit);
  };
};


// Bitwise inverse: ~
Binary.prototype.inverse = function() {
  var newArray = [];
  for (var i = 0; i < this.bitArray.length; i++) {
    newArray.push(!this.bitArray[i] + 0);
  };
  this.bitArray = newArray;
  return this;
};

Binary.prototype.twosComplement = function() {
  this.inverse();
  this.add(new Binary(1))
};

Binary.prototype.add = function(right) {
  this.setBits(Binary.add(this, right).toString());
  return this;
};

Binary.prototype.clone = function() {
  return new Binary(this.toString());
};

// Binary.add = function(left, right) {
//   var longer = (left.length > right.length ? left : right),
//       shorter = (left.length > right.length ? right : left),
//       carry = 0,
//       bitString = '';

//   for (var i = shorter.length - 1; i >= 0; i--) {
//     console.log(i);
//     console.log('bits: ', shorter.bitArray[i], longer.bitArray[longer.length - (shorter.length - i)]);
//     console.log('carry: ', carry);
//     var bit = (shorter.bitArray[i] ^ longer.bitArray[longer.length - (shorter.length - i)]) ^ carry;
//     console.log('bit: ', bit);
//     carry = (bit || carry) ? 0 : 1;
//     bitString = bit.toString() + bitString;
//     console.log('bitString: ', bitString);
//   };

//   for (var j = (longer.length - shorter.length - 1); j >= 0; j--) {
//     console.log(j);
//     console.log('bits: ', longer.bitArray[j]);
//     console.log('carry: ', carry, '\n');
//     var bit = (shorter.bitArray[longer.length - j] ^ 0) ^ carry;
//     console.log('bit: ', bit);
//     carry = bit ? 0 : 1;
//     bitString = bit.toString() + bitString;
//     console.log('bitString: ', bitString);
//   }

//   return new Binary(bitString);
// }

var rep = new Binary('0011 0010');
var rep2 = new Binary(15);
rep.print({withSpaces: true});
rep2.print({withSpaces: false});
rep.inverse().print({withSpaces: true});

// var left = new Binary('0000 0000'), right = new Binary('0001');
// left.add(right).print({withSpaces: true});
// var left = new Binary('0001 0000'), right = new Binary('0001');
// left.add(right).print({withSpaces: true});

module.exports = Binary;
