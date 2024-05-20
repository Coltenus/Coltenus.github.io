<script setup>
</script>

<template>
    <header>
        <nav class="navbar navbar-expand-lg fg-color-2 bg-color-2">
            <a class="plc-1 navbar-brand" href="#">
              <img src="/emblem.png" alt="Logo" width="30" height="30" class="d-inline-block align-text-top">
              Timekeeper
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-expanded="false" aria-controls="navbarText">
                <span class="" role="button" ><i class="fa fa-bars fg-color-1" aria-hidden="true"></i></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <div class="navbar-nav">
                    <a class="plc-1 nav-item nav-link active" href="index">Home</a>
                    <a class="plc-1 nav-item nav-link" href="about">About</a>
                </div>
                <div class="navbar-nav" id="access-links">
                </div>
            </div>
            <div class="prc-1 navbar-nav ml-auto" id="nav-links">
            </div>
        </nav>
    </header>
    <main>
        <div class="mt-5 container mb-5 fill">
            <div id="content"></div>
        </div>
    </main>
    <footer class="footer fixed-bottom text-center fg-color-2 bg-color-2">
        <h4>
            <a class="btn" href="https://github.com/Coltenus">Github</a>
            <a class="btn" href="https://github.com/Coltenus/WD-Labs">Repository</a>
            <a class="btn" href="about">About</a>
        </h4>
    </footer>
</template>