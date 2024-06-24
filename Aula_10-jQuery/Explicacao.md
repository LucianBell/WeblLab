# jQuery

- Biblioteca Javascript para facilitar criação de sites e programação

- Algumas funções:
  - HTML/DOM manipulation
  - CSS manipulation
  - HTML event methods
  - Effects and animations
  - AJAX (Asynchronous JavaScript And XML)
  - Utilities

## jQuery Syntax

- A sintaxe do jQuery é feita sob medida para selecionar elementos HTML e executar alguma ação no(s) elemento(s).
- A sintaxe básica é: **$(selector).action()**
- Exemplo:

```
$(document).ready(function(){
  $("button").click(function(){
    $("p").hide();
  });
});
```
