<template>
<div class="row box-3">
    <div class="col">
        <form>
            <h2 class="text-center">Login</h2>
            <br>
            <div class="form-floating mb-3 box-4">
                <input type="email" class="form-control input-1" id="email" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3 box-4">
                <input type="password" class="form-control input-1" id="password" placeholder="password">
                <label for="floatingInput">Password</label>
            </div>
            <br>
        </form>
        <button type="submit" class="btn btn-1" id="login-button">Log in</button>
    </div>
</div>
<div class="container rounded bg-color-3 box-1 mt-5">
    <p>Do not have an account? You can <button id="register-button" class="btn fg-color-3">Register</button></p>
</div>
</template>