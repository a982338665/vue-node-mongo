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
          <a href="javascript:void(0)" class="price" @click="sortGoods">Price
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
              <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}"
                     @click="setPriceFilter('all')">All</a>
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
            <div class="accessory-list col-4 list-warp">
              <ul>
                <li v-for="(item,index) in goodsList" class="item">
                  <div class="pic">
                    <!--                    <a href="#"><img v-bind:src="'/static/'+item.prodcutImg" alt=""></a>-->
                    <!--        图片懒加载：图片未加载出来时，显示黑色，加载后显示图片  \static\loading-svg\loading-bars.svg 中设置         -->
                    <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click='addCart(item)'>加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                <!--                加载中...-->
                <img src="../../static/loading-svg/loading-spinning-bubbles.svg" v-show="loading">
              </div>
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
                loading: false,
                msg: 'hello vue',
                goodsList: [],
                priceChecked: 'all',
                busy: false,
                priceFilter: [
                    {
                        startPrice: '0.00',
                        endPrice: '100.00'
                    },
                    {
                        startPrice: '100.00',
                        endPrice: '500.00'
                    },
                    {
                        startPrice: '500.00',
                        endPrice: '1000.00'
                    },
                ],

                filterBy: false,//弹出样式
                overLayFlag: false,//是否遮罩
                sortFlag: true,
                page: 1,
                pageSize: 8
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
            getGoodsList: function (flag) {
                console.error(this.priceChecked)
                let params = {
                    page: this.page,
                    pageSize: this.pageSize,
                    sort: this.sortFlag ? 1 : -1,
                    priceChecked: this.priceChecked
                }
                this.loading = true
                axios.get('/goods', {
                    // timeout: 3000
                    params
                }).then(res => {
                    this.loading = false;
                    console.error('正式：。。。')
                    let result = res.data;
                    if (result.status == '0') {
                        if (flag) {//表示是true的时候，需要累加
                            this.goodsList = this.goodsList.concat(result.result.list)
                            if (result.result.count == 0) {
                                this.busy = true
                            } else {
                                this.busy = false
                            }

                        } else {
                            this.goodsList = result.result.list
                            this.busy = false
                        }
                    } else {
                        this.goodsList = [];
                    }
                }).catch(err => {
                    // this.goodsList = this.getMockData().result;
                    console.error('mock：。。。' + err)
                    // console.error(JSON.stringify(this.goodsList))
                });
            },
            sortGoods() {
                //取反
                this.sortFlag = !this.sortFlag;
                this.page = 1;
                this.getGoodsList()
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
                this.page = 1
                this.getGoodsList()
                //关闭悬浮框
                this.closePop();
            },
            loadMore() {
                //busy=true时，表示滚动失效，保证每次滚动仅有一个请求被发送
                this.busy = true;
                setTimeout(() => {
                    this.page++;
                    //此处需要注意：此种方式，需要累加数据，即page==2时，页面上将会有1,2两页的数据
                    this.getGoodsList(true)
                }, 500);
            },
            addCart(item) {
                let productId = item.productId
                axios.post('/goods/addCart', {
                    productId: productId
                }).then(res => {
                    if (res.data.status == 0) {
                        alert('加入成功')
                    } else {
                        console.error(JSON.stringify(res))
                        alert('加入失败:' + res.data.msg)

                    }
                })
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
  .container {
    padding: 0 10px;
  }

  .filter-nav {
    height: 55px;
    line-height: 55px;
    background-color: white;
    text-align: right;
    padding-right: 20px;
    margin: 15px 0 15px 0;
  }

  .def {
    color: #ee7a23;
  }

  .filter-nav span {
    margin-right: 10px;
  }

  .filter-nav a {
    margin-left: 10px;
  }

  .icon-arrow-short {
    width: 11px;
    height: 11px;
  }

  .goods-container {
    display: flex;
  }

  .price-wrap {
    padding: 0 20px
  }

  .filter-price dt {
    height: 40px;
    line-height: 40px;
    margin-bottom: 30px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .filter-price dd {
    height: 26px;
    line-height: 26px;
    margin-bottom: 20px;
  }

  .filter-price a {
    transition: all .3s ease-out;
  }

  .cur {
    border-left: 2px solid #ee7a2c;
    color: #ee7a2c;
    transition: all .3s ease-out;
    padding-left: 15px;
  }

  .filter-price dd a:hover {
    border-left: 2px solid #ee7a2c;
    color: #ee7a2c;
    transition: all .3s ease-out;
    padding-left: 15px;
  }

  .list-warp {
    flex: 1;
  }

  .list-warp ul:after {
    clear: both;
    content: '';
    height: 0;
    display: block;
    visibility: hidden;
  }

  .list-warp .item {
    width: 23.80952%;
  }
</style>
