The idea is that this can create little tiles for use as hatched bitmap fills for eg. TileMill.

Requires node canvas which can be a bit of a pain to get going.

to use a tile in carto styles the code is gogin to be something like this...
```
#hatched-area {
  polygon-pattern-file: url("images/hatched-area.png");
  line-opacity:0;
  polygon-opacity:0;
}
```