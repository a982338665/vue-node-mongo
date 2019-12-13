<template>
  <div>
    <!--  此处必须有外部元素包裹它-->
    <nav-header></nav-header>
    <nav-bread>
      <!--   将数据放入slot   -->
      <span slot="bread1">Goods</span>
      <!--      <span slot="bread2">Goods2</span>-->
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)">All</a></dd>
              <dd>
                <a href="javascript:void(0)">0 - 100</a>
              </dd>
              <dd>
                <a href="javascript:void(0)">100 - 500</a>
              </dd>
              <dd>
                <a href="javascript:void(0)">500 - 1000</a>
              </dd>
              <dd>
                <a href="javascript:void(0)">1000 - 2000</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList">
                  <div class="pic">
                    <a href="#"><img v-bind:src="'/static/'+item.prodcutImg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.prodcutPrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>

    //引入css,@代表目录src，可全局搜索查看
    import '@/assets/css/base.css'
    import '@/assets/css/product.css'
    import NavHeader from '../components/NavHeader'
    import NavFooter from '../components/NavFooter'
    import NavBread from '../components/NavBread'
    import axios from 'axios'


    export default {
        data() {
            return {
                msg: 'hello vue',
                goodsList: []
            }

        },
        components: {
            NavHeader,
            NavFooter,
            NavBread
        },
        //初始化方法
        mounted: function () {
            this.getGoodsList()
        },
        methods: {
            getGoodsList() {
                axios.get('/goods', {
                    timeout: 1
                }).then(res => {
                    this.goodsList = res.data
                }).catch(err => {
                    this.goodsList = this.getMockData().result;
                    // console.error(JSON.stringify(this.goodsList))
                });
            },
            getMockData() {
                return {
                    "status": "0",
                    "result": [
                        {
                            "productId": "10001",
                            "productName": "小米6",
                            "prodcutPrice": "2499",
                            "prodcutImg": "mi6.jpg"
                        },
                        {
                            "productId": "10002",
                            "productName": "小米笔记本",
                            "prodcutPrice": "3999",
                            "prodcutImg": "note.jpg"
                        },
                        {
                            "productId": "10003",
                            "productName": "小米6",
                            "prodcutPrice": "2499",
                            "prodcutImg": "mi6.jpg"
                        },
                        {
                            "productId": "10004",
                            "productName": "小米6",
                            "prodcutPrice": "2499",
                            "prodcutImg": "1.jpg"
                        },
                        {
                            "productId": "10005",
                            "productName": "小米6",
                            "prodcutPrice": "2499",
                            "prodcutImg": "2.jpg"
                        },
                        {
                            "productId": "10006",
                            "productName": "小米6",
                            "prodcutPrice": "2499",
                            "prodcutImg": "3.jpg"
                        },
                        {
                            "productId": "10007",
                            "productName": "小米6",
                            "prodcutPrice": "2499",
                            "prodcutImg": "4.jpg"
                        },
                        {
                            "productId": "10008",
                            "productName": "小米6",
                            "prodcutPrice": "2499",
                            "prodcutImg": "5.jpg"
                        }
                    ]
                }
            }
        }

    }


</script>

<style>
</style>
