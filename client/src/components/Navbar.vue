<template>
<div class="nav">
    <router-link to="/menu">Menu</router-link>

    <router-link to="/">Kasir</router-link>

    <router-link to="/arsip">Arsip</router-link>
</div>
</template>

<script>
export default {
    name:'Navbar',
}
</script>

<style scoped>
    .nav a:hover{
        text-decoration: underline;
        cursor: pointer;   
    }
    .nav{
        color: #1d3994;
        font-size: 19px;
        list-style: none;
        display: flex;
        flex-direction: row;
        justify-content:center;
        align-content: center;
        margin-bottom: 0.6rem;
    }
    .nav a{
        text-decoration-color: transparent;
        margin-inline: 1rem;
    }
     .nav a:visited{
         color: #1d3994;
    }
    .nav a.router-link-exact-active {
        text-decoration: underline;
        color: #000;
        font-weight: bolder;
}
</style>