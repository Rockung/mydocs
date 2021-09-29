## SASS

```sass
// SASS
// ====

// variables
$brand-color:    orangered
$base-font-size: 14px

// mixins
=rounded($num)
  -webkit-border-radius: $num
  -moz-border-radius:    $num
  -ms-border-radius:     $num
  border-radius:         $num
  
// styles
header
  background: $brand-color
  font-size:  ($base-font-size * 2)
  
  .logo
    +rounded(10px)
    
    a
      color: white
```

## SCSS

```scss
// SCSS
// ====

//variables
$brand-color:    orangered;
$base-font-size: 14px;

// mixins
@mixin rounded($num) {
  -webkit-border-radius: $num;
  -moz-border-radius:    $num;
  -ms-border-radius:     $num;
  border-radius:         $num; 
}

header {
  background: $brand-color;
  font-size: ($base-font-size * 2);
  
  .logo {
    @include rounded(10px);
    
    a {
      color: white;
    }
  }
}
```

## LESS



## Resources

Convert CSS to SASS

http://css2sass.herokuapp.com/

SASS vs LESS

https://css-tricks.com/sass-vs-less/

Scalable & Modualar Architecture for CSS

https://smacss.com/book/type-base

