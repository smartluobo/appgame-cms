<template>

	<div style="padding: 50px;">
		<div style="width: 1000px;padding-bottom: 50px;">
		    <Steps :current="0">
		        <Step title="基本信息" icon="person-add"></Step>
		        <Step title="相关图片" icon="camera"></Step>
		        <Step title="完成" icon="email"></Step>
		    </Steps>
		</div>
    <Form :model="formItem" :label-width="80" ref="formItem" :rules ="rules">
		<Row>
			<Col span="5">
			  <FormItem label="名字" prop="jumpName">
				  <Input v-model="formItem.jumpName" placeholder="Enter name..." autocomplete="off"></Input>
			  </FormItem>
			</Col>
			
			<Col span="5">
			   <FormItem label="appid" prop="jumpAppId">
				   <Input v-model="formItem.jumpAppId" placeholder="Enter appid..." autocomplete="off" ></Input>
			   </FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="5">
			  <FormItem label="路径" prop="jumpUrl">
				  <Input v-model="formItem.jumpUrl" placeholder="Enter key..." @on-blur="setExtraData" autocomplete="off" ></Input>
			  </FormItem>
			</Col>
			
			<Col span="5">
			  <FormItem label="序号" prop="itemIndex">
				  <Input v-model="formItem.itemIndex" placeholder="Enter key..." autocomplete="off" ></Input>
			  </FormItem>
			</Col>
		</Row>
		
		<Row>
			<Col span="5">
			 <FormItem label="分类" prop="typeId">
				<Select v-model="formItem.typeId" multiple style="width:250px" autocomplete="off" >
					<Option v-for="(item,index) in typeList" :value="item.id" :key="item.typeValue">{{ item.typeValue }}</Option>
				</Select>
			 </FormItem>
			</Col>
			
			<Col span="5">
			   <FormItem label="盒子" prop="appId">
					<Select v-model="formItem.appId" style="width:250px" autocomplete="off" >
						<Option v-for="(item,index) in boxList" :value="item.appId" :key="item.appId">{{ item.appId }} - {{ item.title }}</Option>
					</Select>
				</FormItem>
			</Col>
		</Row>
		
		<Row>
			<Col span="5">
			  <FormItem label="秘钥" prop="secretKey">
				  <Input v-model="formItem.secretKey" placeholder="Enter key..." autocomplete="off" ></Input>
			  </FormItem>
			</Col>
			
			<Col span="5">
			  <FormItem label="点击量" prop="clickNub">
				  <Input v-model="formItem.clickNub" placeholder="Enter key..." autocomplete="off" ></Input>
			  </FormItem>
			</Col>
		</Row>
		
		
		<Row>
			<Col span="5">
			  <FormItem label="logo" prop="logo">
				  <Input v-model="formItem.logo" placeholder="Enter key..." autocomplete="off" disabled></Input>
			  </FormItem>
			</Col>
			
			<Col span="5">
			  <FormItem label="广告图" prop="bannerUrl">
				  <Input v-model="formItem.bannerUrl" placeholder="Enter key..." autocomplete="off" disabled></Input>
			  </FormItem>
			</Col>
		</Row>
	 
	 
        <FormItem label="描述" prop="introduce">
			<Col span="9">
            <Input v-model="formItem.introduce" type="textarea" :autosize="{minRows: 2,maxRows: 5}" 
			placeholder="Enter description..."></Input>
			</Col>
		</FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formItem')">下一步</Button>
            <Button style="margin-left: 8px" @click="goback">取消</Button>
        </FormItem>
    </Form>
	</div>
</template>
<script>
    export default {
        data () {
            return {
                formItem: {
                    jumpName: '',
                    jumpAppId: '',
                    jumpUrl: '',
                    itemIndex: '',
					extraData:'',
					appId:'',
					secretKey:'',
					clickNub:'',
					introduce:'',
					typeId:'',
					id:'',
					bannerUrl:'',
					logo:'',
					logoType:'png',
					bannerType:'gif'
                },
				boxList: [],
				typeList:[],
				handleType:"",
				model1:"",
				rules:{
				  jumpName: [
					{required: true, message: '必填',tirgger:'blur'}
				  ],
				  jumpAppId: [
					{required: true, message: '必填',tirgger:'blur'}
				  ],
				  jumpUrl: [
					{required: true, message: '必填',tirgger:'blur'}
				  ],
				  itemIndex: [
					{required: true, message: '必填'}
				  ],
				  extraData: [
					{required: true, message: '必填',tirgger:'blur'}
				  ],
				  appId: [
					{required: true, message: '必填',tirgger:'blur'}
				  ],
				  secretKey: [
					{required: true, message: '必填',tirgger:'blur'}
				  ],
				  clickNub: [
					{required: true, message: '必填'}
				  ],
				  typeId: [
					{required: true, message: '必填'}
				  ],
				  introduce: [
					{required: true, message: '必填',tirgger:'blur'}
				  ]
				},
				props:['id']
            }
        },
		mounted(){
			var id = this.$route.params.id;
			var that = this;
			if(id !=undefined){
				that.handleType = "edit"
				this.https.fetchPost('/customerApp/contr/selectByPrimaryKey', {
				  id: id,        // 参数 firstName
				})
				.then(function (response) {
					that.formItem = response.data;
					console.log(that.formItem);
					
					let dataStr=response.data.typeId;  //原始字符串  
					    let dataStrArr=dataStr.split(",");  //分割成字符串数组  
					    let dataIntArr=[];//保存转换后的整型字符串  
					    //方法一  
					    dataStrArr.forEach(item => {  
					        dataIntArr.push(+item);  
					    });  
					  
					that.formItem.typeId =dataIntArr;
				})
				.catch(function (error) {
				  console.log(error);
				});
			}
		 },
		created: function () {
			   var that = this;
			   this.https.fetchPost('/customerApp/contr/getBoxList', {
				  idBox: "1",        // 参数 firstName
				})
				.then(function (response) {
					that.boxList = response.data.boxList;
					that.typeList = response.data.typeList;
				})
				.catch(function (error) {
				  console.log(error);
				});
		 },
		 methods:{
			 handleSubmit (name) {
			 	var that = this;
				if(that.handleType == "edit"){
					this.https.fetchPost('/customerApp/contr/edit_customer_app',that.formItem)
					 .then(function (response) {
						console.log(response.data)
						if(response.data.code =="200"){
							/* that.$Message.success('修改成功!'); */
							that.$router.push({name:'customerAddImages',params:{'id':that.formItem.id,"logo":that.formItem.logo,"bannerUrl":that.formItem.bannerUrl}});
						}
					 })
					 .catch(function (error) {
					   console.log(error);
					 });
				}else{
					this.https.fetchPost('/customerApp/contr/addCustomerApp',that.formItem)
					 .then(function (response) {
						 console.log(response.data);
						if(response.data.code =="SUCCESS"){
							that.$Message.success('添加成功!');
							that.$router.push({name:'customerAddImages',params:{'id':response.data.id,"logo":"","bannerUrl":""}});
						}
					 })
					 .catch(function (error) {
					   console.log(error);
					 });
				}
			 	
			 },
			 setExtraData(res){
				/* var url = this.formItem.jumpUrl;
				if(url !=""){
					var theRequest = new Object();
					if(url.indexOf("?") != -1) {
						var str = url.substr(1);
						var strs = str.split("&");
						for(var i = 0; i < strs.length; i++) {
							theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
						}
						this.formItem.extraData = theRequest;
					}
				} */
			 },
			 goback(){
				 this.$router.go(-1);
			 }
		 }
		
    }
</script>
