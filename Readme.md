# zip

  Archive stuff on the client. __(WIP)__

  ```js
location.href = zip()
  .add('a.txt', 'a')
  .add('b.txt', 'b')
  .datauri();
  ```

## Installation

  Install with [component(1)](http://component.io):

    $ component install yields/zip

## Todo

  - ✔ create simple zip files.
  - ✗ navigate entries.
  - ✗ remove / update entries.
  - ✗ read zip files.
  - ✗ use `DataView()` as a default.
  - ✗ `archive("images.zip").list(fn)`
  - ✗ mixin emitter.
  - ✗ use `visionmedia/batch`. (compress / decompress progress events)
  - ✗ comment on specific entries.
  - ✗ tests.

## Papers

  - [spec](http://www.pkware.com/documents/casestudies/APPNOTE.TXT)

## License

  MIT
