<template>
    <div class="productlist">
        <div class="single-box">
            <div class="checked-box">
                <van-checkbox v-model="checked" checked-color="#704d2d"></van-checkbox>
            </div>
            <div class="img">
                <img class="auto-img" src="http://www.kangliuyong.com:10002/images/product_small/IMG_0384_02p.jpg" alt="">
            </div>
            <div class="title-box">
                <div class="zhname">标准美式</div>
                <div class="enname">Adsfsdf</div>
                <div class="price">&yen;22.00</div>
                <div class="parameters">
                    无糖/嘉措
                </div>
            </div>
            <div class="count">
                <van-stepper v-model="value" theme="round" button-size="22" disable-input />
            </div>
        </div>
    </div>
</template>

<script>
import '../assets/less/productlist.less';
    export default {
        name:'Productlist',
        data(){
            return{
                checked:true,
                value:1
            }
        }
    }
</script>