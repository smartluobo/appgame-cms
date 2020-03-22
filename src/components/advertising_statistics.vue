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

			    <FormItem label="appid" prop="appId">
			        <Input v-model="formValidate.appId" placeholder="Enter your appId"  style="width:250px"></Input>
			    </FormItem>
				
				</Col>
				<Col span="5">
			   
			   <FormItem label="广告名" prop="jumpName">
			       <Input v-model="formValidate.jumpName" placeholder="Enter your jumpName" style="width:250px" ></Input>
			   </FormItem>
				</Col>
				
				
				 <i-col span="4">
					 <FormItem label="日期" prop="createTime">
				            <Date-picker type="date" placeholder="选择日期" style="width: 200px" v-model="formValidate.createTime"
							 @on-change="(datetime) =>{ changeDate(datetime)}"
							 ></Date-picker>
					 </FormItem>
				 </i-col>
				</Row>
				
				<Row>
				<Col span="5">
					<FormItem>
						<div style="float:left;">
						<i-button type="primary" icon="ios-search" @click="handleSubmit('formValidate')">搜索</i-button>
						<Button @click="handleReset('formValidate')" icon="ios-search">重置</Button>
						</div>
					</FormItem>
				</Col>
				</Row>	
			   
			</Form>
		</div>
		<i-table width="1200" height="700"border ref="currentRowTable" :columns="columns7" :data="dataList"></i-table>
	</div>

</template>

<script>
    export default {
		name: 'app',
        data () {
            return {
                columns7: [
                    {
                        title: 'appId',
                        key: 'appId',
						width: 300,
						align: 'center'
                    },
                    {
                        title: '广告名',
                        key: 'jumpName',
						align: 'center',
						width: 150
					},
					{
					    title: '图标',
					    key: 'logo',
						align: 'center',
						width: 100,
						render: (h, params) => {
							if(params.row.logo == ""){
								return h('span', '无logo');
							}else{
								return h('img',{
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										width: '60px', // 改变icon的样式
										height:'60px'
									},
									attrs:{
										src :params.row.logo
									}
								})
							}
						}
					},
					{
					    title: '盒子',
					    key: 'box',
						align: 'center',
						width: 180
					},
					{
					    title: 'pv',
					    key: 'pv',
						align: 'center',
						width: 150
					},
					{
					    title: 'uv',
					    key: 'uv',
						align: 'center',
						width: 150
					},
					{
					    title: '日期',
					    key: 'createTime',
						align: 'center',
						width: 150
					},
                ],
				dataList:[],
			formValidate: {
				jumpName:'',
				createTime:'',
				appId:"",
			},
            }
        },
	   created: function () {
		   var that = this;
		   // `this` 指向 vm 实例
		   this.https.fetchPost('/customerApp/contr/advertising_statistics', that.formValidate)
			.then(function (response) {
			  that.dataList = response.data.list;
			  that.formValidate.createTime = response.data.createTime;
			})
			.catch(function (error) {
			  console.log(error);
			});
		},
        methods: {
			handleView(url) {
			      this.imgUrl = url;
			      this.visible = true;
			},
			 changeDate(datetime){
			    //这里的date就是我们想要的本地时间
				this.formValidate.createTime = datetime;
			    //这里就可以对后面传进来的参数进行操作了
			  },
			handleSubmit (name) {
				var that = this;
				this.https.fetchPost('/customerApp/contr/advertising_statistics', that.formValidate)
				 .then(function (response) {
					that.dataList = response.data.list;
				 })
				 .catch(function (error) {
				   console.log(error);
				 });
			},
			handleReset (name) {
			   this.$refs[name].resetFields();
			}
        }
    }
</script>
