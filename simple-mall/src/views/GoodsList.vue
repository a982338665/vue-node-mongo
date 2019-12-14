<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
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
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy  }">
            <dl class="filter-price">
              <dt>Price:</dt>
              <!--     添加选中状态           -->
              <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}" @click="priceChecked='all'">All</a>
              </dd>
              <!--    添加数据          -->
              <dd v-for="(price,index) in priceFilter" @click="setPriceFilter(index)">
                <!--     添加选中状态           -->
                <a href="javascript:void(0)" v-bind:class="{'cur':priceChecked==index}">{{price.startPrice}} -
                  {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList">
                  <div class="pic">
                    <!--                    <a href="#"><img v-bind:src="'/static/'+item.prodcutImg" alt=""></a>-->
                    <!--        图片懒加载：图片未加载出来时，显示黑色，加载后显示图片  \static\loading-svg\loading-bars.svg 中设置         -->
                    <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
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
    <div class='md-overlay ' v-show="overLayFlag" @click="closePop"></div>
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

    axios.defaults.baseURL = 'http://localhost:3000';
    export default {
        data() {
            return {
                msg: 'hello vue',
                goodsList: [],
                priceChecked: 'all',
                priceFilter: [
                    {
                        startPrice: '0.00',
                        endPrice: '500.00'
                    },
                    {
                        startPrice: '500.00',
                        endPrice: '1000.00'
                    },
                    {
                        startPrice: '1000.00',
                        endPrice: '1500.00'
                    },
                ],

                filterBy: false,//弹出样式
                overLayFlag: false//是否遮罩
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
                    timeout: 3000
                }).then(res => {
                    console.error('正式：。。。')
                    this.goodsList = res.data.result.list
                }).catch(err => {
                    // this.goodsList = this.getMockData().result;
                    console.error('mock：。。。'+err)
                    // console.error(JSON.stringify(this.goodsList))
                });
            },
            showFilterPop() {
                this.filterBy = true
                this.overLayFlag = true
            },
            closePop() {
                this.filterBy = false
                this.overLayFlag = false
            },
            setPriceFilter(index) {
                //选择时间段后，改为选中状态
                this.priceChecked = index
                //关闭悬浮框
                this.closePop();
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
