<template>
    <div class="working">
        <div class="workbox">
            <p>当前任务：</p>
        </div>
    </div>
</template>

<script>
export default {
    name:'working',

}
</script>

<style scoped>
.working{
    width: 100%;
    height: 100%;
    position: relative;
}
.workbox p{
    font-size: 1.2rem;
    color: rgb(233, 176, 19);
    position: absolute;
    left: 1rem;
    top: -12rem;
}

</style>
