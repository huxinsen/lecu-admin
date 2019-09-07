<template>
  <div class="info-search">
    <el-col :span="24">
      <el-form inline :model="searchForm">
        <el-form-item>
          <el-input v-model="searchForm.shopId" placeholder="商店 ID" @keyup.enter.native="getInfo"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getInfo">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 店铺信息 -->
    <h4 v-if="shopForm.shopId">商铺信息</h4>
    <el-form :model="shopForm" v-if="shopForm.shopId">
      <el-row>
        <el-col :span="12">
          <el-form-item label="店铺名称:">
            <span>{{ shopForm.name }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="店铺 ID:">
            <span>{{ shopForm.shopId }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="店铺介绍:">
            <span>{{ shopForm.notice }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="店铺地址:">
            <span>{{ shopForm.address }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系电话:">
            <span>{{ shopForm.tel }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="营业时间:">
            <span>{{ shopForm.time }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="店铺法人:">
            <span>{{ shopForm.legalRepr }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号:">
            <span>{{ shopForm.idNumber }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="店铺头像:">
            <img v-if="shopForm.shopImg" :src="baseImgUploadedPath + shopForm.shopImg" class="pic" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="营业执照:">
            <img
              v-if="shopForm.licenseImg"
              :src="baseImgUploadedPath + shopForm.licenseImg"
              class="pic"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="身份证正:">
            <img
              v-if="shopForm.withIdFrontImg"
              :src="baseImgUploadedPath + shopForm.withIdFrontImg"
              class="pic"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证反:">
            <img
              v-if="shopForm.withIdBackImg"
              :src="baseImgUploadedPath + shopForm.withIdBackImg"
              class="pic"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="修改建议:">
            <span>{{ shopForm.checkMsg }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <h4 v-if="commodityList.length > 0">商店所有商品</h4>
    <el-table :data="commodityList" style="width: 100%" v-if="commodityList.length > 0">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="table-expand">
            <el-row>
              <el-col :span="12">
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="商品分类">
                  <span>{{ props.row.classValue }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品详情">
                  <span>{{ props.row.details }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="活动详情">
                  <span>{{ props.row.promotionInfo }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开始时间">
                  <span>{{ props.row.startTime }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="原价">
                  <span>{{ props.row.originalPrice }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="结束时间">
                  <span>{{ props.row.endTime }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="现价">
                  <span>{{ props.row.price }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品图片1">
                  <img
                    v-if="props.row.pic1"
                    :src="baseImgUploadedPath + props.row.pic1"
                    class="pic"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="商品图片2" v-if="props.row.pic2">
                  <img
                    v-if="props.row.pic2"
                    :src="baseImgUploadedPath + props.row.pic2"
                    class="pic"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品图片3" v-if="props.row.pic3">
                  <img
                    v-if="props.row.pic3"
                    :src="baseImgUploadedPath + props.row.pic3"
                    class="pic"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="商品图片4" v-if="props.row.pic4">
                  <img
                    v-if="props.row.pic4"
                    :src="baseImgUploadedPath + props.row.pic1"
                    class="pic"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品图片5" v-if="props.row.pic5">
                  <img
                    v-if="props.row.pic5"
                    :src="baseImgUploadedPath + props.row.pic5"
                    class="pic"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="活动详情" prop="promotionInfo"></el-table-column>
      <el-table-column label="活动时间" prop="time" width="190"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { baseImgUploadedPath } from '@/config/env'
import { getShop } from '@/api/shop'
import { getCommoditiesAdmin } from '@/api/commodity'
export default {
  data() {
    return {
      searchForm: {
        shopId: '',
      },
      commodityList: [],
      shopForm: {},
      baseImgUploadedPath,
    }
  },
  computed: {
    ...mapGetters(['username']),
  },
  mounted() {},
  methods: {
    // 查询数据
    getInfo() {
      if (this.searchForm.shopId) {
        getShop(this.searchForm.shopId)
          .then(res => {
            if (res.data.success === false) {
              this.$notify.error({
                title: '失败',
                message: res.data.message,
              })
            } else {
              this.shopForm = res.data
            }
          })
          .catch(err => {
            this.$notify.error({
              title: '失败',
              message: '系统出错，请重试!',
            })
          })
        getCommoditiesAdmin(this.searchForm.shopId)
          .then(res => {
            this.commodityList = res.data
            this.commodityList.forEach(item => {
              item.startTime = this.moment(item.startTime).format(
                'YYYY-MM-DD HH:mm:ss',
              )
              item.endTime = this.moment(item.endTime).format(
                'YYYY-MM-DD HH:mm:ss',
              )
              item.time = item.startTime + ' 至 ' + item.endTime
            })
          })
          .catch(err => {
            this.$notify.error({
              title: '失败',
              message: '系统出错，请重试!',
            })
          })
      } else {
        this.$notify.info({
          title: '提示',
          message: '请输入内容！',
        })
      }
    },
  },
}
</script>

<style scoped>
.info-search {
  box-sizing: border-box;
  min-width: 780px;
  padding: 20px;
}

.pic {
  width: 160px;
  height: 160px;
  display: block;
}
</style>
