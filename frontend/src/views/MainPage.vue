<script></script>

<template>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home page</title>

    </head>
    <header>
        <div><img alt="Gruppomania logo" class="logoMain" src="@/assets/icon-left-font-monochrome-black.svg" width="200"
            height="40" 
             background="transparent" />
        </div>
    </header>

    <body>
        
        <h1>Welcome to<br>Groupomania<br>chat!</h1>

        <div class="messageContainer"></div>
    </body>

    </html>
</template>

<style>
body {
  margin: 10%;
  height: 1000PX;
  width: auto;
}

.logoMain{
/* filter: brightness(0) saturate(100%) invert(58%) sepia(100%) saturate(2873%)
 hue-rotate(143deg) brightness(95%) contrast(104%); */
}

h1 {
    font-weight: 500;
    font-size: 3.6rem;
    color: rgba(17, 10, 10, 0.5);
    text-shadow: 6px 1px 7px rgba(87, 134, 236, 0.5);
    text-align:center;
}

</style>