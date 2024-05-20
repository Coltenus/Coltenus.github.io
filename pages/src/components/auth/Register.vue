<template>
<div class="row box-3">
    <div class="col">
        <form>
            <h2 class="text-center">Registration</h2>
            <div class="form-floating mt-5 mb-3 box-4">
                <input type="email" class="form-control input-1" id="email" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mt-3 mb-3 box-4">
                <input type="password" class="form-control input-1" id="password1" placeholder="password1">
                <label for="floatingInput">Password</label>
            </div>
            <div class="form-floating mb-3 box-4">
                <input type="password" class="form-control input-1" id="password2" placeholder="password2">
                <label for="floatingInput">Confirm password</label>
            </div>
            <div class="form-floating mb-3 label-1 box-4">
                <select class="form-select input-1" id="gender">
                    <option selected disabled="true">Select gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Other</option>
                </select>
                <label class="label-1" for="floatingSelect">Gender</label>
            </div>
            <div class="form-floating mb-3 label-1 box-4">
                <input type="date" class="form-control input-1" id="bdate" placeholder="bdate">
                <label for="floatingInput">Birth date</label>
            </div>
        </form>
        <button type="submit" class="btn btn-1 mt-5" id="register-button">Register</button>
    </div>
</div>
<div class="container rounded bg-color-3 box-1 mt-5">
    <p>If you have an account, you can <button id="login-button" class="btn fg-color-3">Login</button></p>
</div>
</template>