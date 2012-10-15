var fs = require('fs');
var bz2 = require('./bzip2.js');

var bufferSize = 256;

var reader = fs.createReadStream('test.txt.bz2', { bufferSize: bufferSize });

var blockSize;
reader.on('data', function (data) {
	var bitReader = bz2.array(data);
	if (!blockSize) {
		blockSize = bz2.header(bitReader);
	}
    console.log( bz2.decompress(bitReader, blockSize) );
});
