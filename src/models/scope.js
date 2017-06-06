//@flow

class VueHead {
    title: string;
    meta: Object[];
    constructor(title: string, meta: Object[]) {
        this.title = title;
        this.meta = meta;
    }
}

class VueScope {
    head: VueHead;
    components: string[];
    constructor(head: Object, components: string[]) {
        this.head = new VueHead(head.title, head.meta);
        this.components = components;
    }
}

class Scope {
    data: Object;
    vue: VueScope;
    constructor(dataObj: Object = {}, vueObj: Object = {}) {
        this.data = {};
        this.vue = new VueScope({
            title: '',
            meta: []
        },
        []);

        this.mergeData(dataObj);
        this.mergeVue(vueObj);
    }
    mergeData(dataObj: Object) {
        if (dataObj) {
            Object.assign(this.data, dataObj);
        }
    }
    mergeVue(vueObj: Object) {
        if (vueObj.components) {
            this.vue.components = this.vue.components.concat(vueObj.components);
        }
        if (vueObj.head) {
            if (vueObj.head.meta) {
                this.vue.head.meta = this.vue.head.meta.concat(vueObj.head.meta);
            }

            if (vueObj.head.title) {
                this.vue.head.title = vueObj.head.title;
            }
        }
    }
}

module.exports.Scope = Scope;
