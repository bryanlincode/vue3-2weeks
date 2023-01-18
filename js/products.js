import {
  createApp
} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const url = 'https://vue3-course-api.hexschool.io/v2'; // 請加入站點
const path = 'jpshop'; // 請加入個人 API Path
createApp({
  data() {
    return {
        productsAll:[],
        tempProducts:{},
    }
  },
  methods: {
    // 確認是否登入｀
    checkLogin(){
        console.log(`${url}/api/user/check`);
        const set = `${url}/api/user/check`
        axios.post(set)
        .then((res)=>{
            console.log(res.data);
            this.getProducts();
        })
        .catch((err)=>{
            console.log(err);
        })
    },
    // 取得產品
    getProducts(){
        console.log(`${url}/api/${path}/admin/products`);
        const productsUrl = `${url}/api/${path}/admin/products/all`;
        axios.get(productsUrl)
        .then((res)=>{
            console.log(res.data);
            // 將 Products 存取 ProductsAll陣列主
            this.productsAll = res.data.products;    
        })
        .catch((err)=>{
            console.log(err.data);
        })
    },
  },
    mounted() {
      //取出token 
        const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith('hexToken='))
        ?.split('=')[1];
        console.log(cookieValue);
        // axios 存取 Header 發送
        axios.defaults.headers.common['Authorization'] = cookieValue;
        this.checkLogin();
  },
}).mount('#app');