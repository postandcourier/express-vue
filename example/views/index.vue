<template lang="html">
    <div>
        <h1>{{title}}</h1>
        <p>Welcome to the {{title}} demo. Click a link:</p>
        <button type="button" name="button" v-on:click="hello">Say FOO</button>
        <input v-model="message" placeholder="edit me">
        <foo></foo>
    </div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            title: 'Hello'
        }
    },
    methods: {
        hello: function() {
            console.log('Foo');
        }
    },
    beforeCreate: function () {
        this.$options.components.foo = require('/Users/danielcherubini/Coding/Node/express-vue/example/views/components/foo.vue')
    }
}
</script>

<style lang="css">
</style>
