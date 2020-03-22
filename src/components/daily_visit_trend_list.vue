<style>

.title{
	padding-left: 30px;
	padding-right: 10px;
}

</style>
<template>
	<div id="app" style="padding: 3px;">
		<div>
			<Form ref="formValidate" :model="formValidate" :label-width="100">
				<Row>
				<Col span="5">
			    <FormItem label="appId" prop="appId">
			        <Input v-model="formValidate.appId" placeholder="Enter your appid"  style="width:250px"></Input>
			    </FormItem>
				</Col>
				
				
				<Col span="5">
				<FormItem label="日期" prop="refDate">
					<Date-picker type="date" placeholder="选择日期" style="width: 200px" v-model="formValidate.refDate"></Date-picker>
				</FormItem>
				</Col>
				
				</Row>
				<Row>
					<FormItem>
						<div style="float:left;padding-left: 50px">
						<i-button type="primary" icon="ios-search" @click="handleSubmit('formValidate')">搜索</i-button>
					    <Button @click="handleReset('formValidate')" icon="ios-search">重置</Button>
						<i-button type="dashed">总新增用户:{{this.$data.allVisitUvNew}}</i-button>
						<i-button type="dashed">天新增点击次数:{{this.$data.allVisitPv}}</i-button>
						</div>
						   
		

					</FormItem>
				</Row>
			</Form>
		</div>
		<Modal title="查看大图" v-model="visible" class-name="fl-image-modal">
		      <img :src="imgUrl" v-if="visible" style="width: 100%">
		</Modal>
		   <Table border :columns="columns7" :data="dataList" style="height: 750px;"></Table>
		  <Page :total="this.$data.formValidate.total" :current="this.$data.formValidate.pageNo" show-elevator style="padding-top: 5px;" @on-change="changePage"/>
	</div>

</template>

<script>
    export default {
		name: 'app',
        data () {
            return {
                columns7: [
					{
					    title: 'appid',
					    key: 'appid',
						align: 'center',
						width: 200
					},
					{
					    title: 'title',
					    key: 'title',
						align: 'center',
						width: 150
					},
					{
					    title: '日期',
					    key: 'ref_date',
						align: 'center',
						width: 100
					},
					{
					    title: '新用户数',
					    key: 'visit_uv_new',
						align: 'center',
						width: 100
					},
                    {
                        title: '访问人数',
                        key: 'visit_uv',
						width: 120,
						align: 'center'
                    },
					{
					    title: '访问次数',
					    key: 'visit_pv',
						align: 'center',
						width: 120
					},
					{
					    title: '打开次数',
					    key: 'session_cnt',
						align: 'center',
						width: 100
					},
                    {
                        title: '次均停留时长(单位：秒)',
                        key: 'stay_time_session',
						align: 'center',
						width: 200
					},
					
					{
					    title: '平均访问深度',
					    key: 'visit_depth',
						align: 'center',
						width: 200
					},
					{
					    title: '人均停留时长 (单位：秒)',
					    key: 'stay_time_uv',
						align: 'center',
						width: 200
					}
                ],
				dataList:[],
			formValidate: {
				appId:"",
				refDate:"",
				pageNo:0,
				total:0
			},
			typeList:[],
			boxList:[],
			visible:false,
			imgUrl :"",
			pageNo:1,
			allVisitPv:0,
			allVisitUvNew:0
            }
        },
	   created: function () {
		   var that = this;
		   // `this` 指向 vm 实例
		   this.https.fetchPost('/dailyVisitTrend/contr/find_daily_visit_trend_up', that.formValidate)
			.then(function (response) {
			  that.dataList = response.data.rows;
			  that.formValidate.pageNo = response.data.pageNo;
			  that.formValidate.total = response.data.total;
			  that.allVisitPv = response.data.allCount.allVisitPv;
			  that.allVisitUvNew = response.data.allCount.allVisitUvNew;
			})
			.catch(function (error) {
			  console.log(error);
			});
			
		},
        methods: {
			handleSubmit (name) {
				var that = this;
				console.log(that.formValidate.refDate);
				this.https.fetchPost('/dailyVisitTrend/contr/find_daily_visit_trend_up', that.formValidate)
				 .then(function (response) {
					that.dataList = response.data.rows;
					that.formValidate.total =  response.data.total;
					that.formValidate.pageNo =  response.data.pageNo;
					var allCount = response.data.allCount;
					that.allVisitPv = response.data.allCount.allVisitPv;
					that.allVisitUvNew = response.data.allCount.allVisitUvNew;
				 })
				 .catch(function (error) {
				   console.log(error);
				 });
			},
			handleReset (name) {
			   this.$refs[name].resetFields();
			},
			changePage(res){
				 var that = this;
				 that.formValidate.pageNo = res;
				 // `this` 指向 vm 实例
				 this.https.fetchPost('/customerApp/contr/findByPrimaryKey',that.formValidate)
				  .then(function (response) {
						that.dataList = response.data.rows;
						that.formValidate.pageNo = response.data.pageNo;
						that.formValidate.total = response.data.total;
				  })
				  .catch(function (error) {
					console.log(error);
				  });
			}
        }
    }
</script>
